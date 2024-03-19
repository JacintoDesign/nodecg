// Button Elements
const nextBtn = document.getElementById('next_btn');
const buttonSubmit = document.getElementById('submit_btn');
const buttonPlay = document.getElementById('in_btn');
const buttonClear = document.getElementById('out_btn');
// Replicants
const tickerItemsReplicant = nodecg.Replicant('tickerItems', {defaultValue: []});
const refreshIntervalReplicant = nodecg.Replicant('refreshInterval');
const netCBCRep = nodecg.Replicant('netCBC');
const netTSNRep = nodecg.Replicant('netTSN');
const netRSNRep = nodecg.Replicant('netRSN');

// Handle Submit Btn
buttonSubmit.onclick = () => {
  console.log('Updated groupItems:', groupItems);
  console.log('Updated sendableItems:', sendableItems);
  nodecg.sendMessage('update');
  tickerItemsReplicant.value = sendableItems;
  localStorage.setItem('groupItems', JSON.stringify(groupItems));
  localStorage.setItem('sendableItems', JSON.stringify(sendableItems));
};

// Animate In
buttonPlay.onclick = () => {
  console.log("play");
  nodecg.sendMessage('play');
};

// Animate Out
buttonClear.onclick = () => {
  console.log("stop");
  nodecg.sendMessage('stop');
};

// Next Page
nextBtn.onclick = () => {
  console.log("next");
  nodecg.sendMessage('next');
};

// Update Interval
const intervalInput = document.getElementById('interval_input');
const updateIntervalBtn = document.getElementById('update_interval_btn');

updateIntervalBtn.onclick = () => {
  const intervalSeconds = parseInt(intervalInput.value);
  refreshIntervalReplicant.value = intervalSeconds;
};

// Load Replicant value for checkboxes
const CBCcheck = document.getElementById("netCBC");
const TSNcheck = document.getElementById("netTSN");
const RSNcheck = document.getElementById("netRSN");
const netCBCStoredValue = localStorage.getItem("netCBC");
const netTSNStoredValue = localStorage.getItem("netTSN");
const netRSNStoredValue = localStorage.getItem("netRSN");

if (netCBCStoredValue !== null) {
  CBCcheck.checked = netCBCStoredValue === "true";
}

if (netTSNStoredValue !== null) {
  TSNcheck.checked = netTSNStoredValue === "true";
}

if (netRSNStoredValue !== null) {
  RSNcheck.checked = netRSNStoredValue === "true";
}

// Pass Checkbox Value
function netCheck() {
  // Get the checkbox
  if (CBCcheck.checked == true){
    netCBCRep.value = "true";
  } else {
    netCBCRep.value = "false";
  }

  if (TSNcheck.checked == true){
    netTSNRep.value = "true";
  } else {
    netTSNRep.value = "false";
  }

  if (RSNcheck.checked == true){
    netRSNRep.value = "true";
  } else {
    netRSNRep.value = "false";
  }

  localStorage.setItem("netCBC", CBCcheck.checked);
  localStorage.setItem("netTSN", TSNcheck.checked);
  localStorage.setItem("netRSN", RSNcheck.checked);
}

// Initialize
let groupItems = [];
let sendableItems = [];

// LocalStorage functionality ----------------------------------------------------
if (localStorage.getItem('groupItems') && localStorage.getItem('sendableItems')) {
  // Parse the stored JSON data
  groupItems = JSON.parse(localStorage.getItem('groupItems'));
  sendableItems = JSON.parse(localStorage.getItem('sendableItems'));
} else {
  // Default values if nothing is in localStorage
  groupItems = [
    { type: 'Results', message: '100 Meter World Record Holder' },
    { type: 'Results', message: '200 Meter World Record Holder' },
    { type: 'Breaking', message: 'New Marathon Record' },
    { type: 'Breaking', message: 'Canadian swimmers set World Record' },
    { type: 'Promo', message: 'Upcoming: World Championship' },
    { type: 'Free', message: 'Tension as Olympics approach' },
  ];
  sendableItems = [...groupItems];
  // Store the initial arrays in localStorage
  localStorage.setItem('groupItems', JSON.stringify(groupItems));
  localStorage.setItem('sendableItems', JSON.stringify(sendableItems));
}

const tableBody = document.getElementById('table-body');

// Populate the table with groupItems ------------------------------------------
groupItems.forEach((item, index) => {
  const row = document.createElement('tr');
  row.setAttribute('draggable', true);

  // Create Drag / Drop Handle
  const handleCell = document.createElement('td');
  const handleIcon = document.createElement('i');
  handleIcon.className = 'fa fa-bars';
  handleCell.appendChild(handleIcon);
  row.appendChild(handleCell);

  // Type cell with contenteditable
  const typeCell = document.createElement('td');
  typeCell.setAttribute('contenteditable', true);
  typeCell.textContent = item.type;
  typeCell.addEventListener('keypress', (event) => {
    const key = event.key.toUpperCase();
    if (['R', 'B', 'P', 'F'].includes(key)) {
      event.preventDefault(); // Prevent the default character input
      const fullText = { R: 'Results', B: 'Breaking', P: 'Promo', F: 'Free' }[key];
      typeCell.textContent = fullText;
      updateItem(Array.from(tableBody.children).indexOf(row), 'type', fullText);
    }
  });
  typeCell.addEventListener('blur', () => {
    updateItem(Array.from(tableBody.children).indexOf(row), 'type', typeCell.textContent);
  });
  row.appendChild(typeCell);

  // Message cell with contenteditable
  const messageCell = document.createElement('td');
  messageCell.setAttribute('contenteditable', true);
  messageCell.textContent = item.message;
  messageCell.addEventListener('blur', () => {
    updateItem(Array.from(tableBody.children).indexOf(row), 'message', messageCell.textContent);
  });
  row.appendChild(messageCell);

  // Delete Column
  const deleteCell = document.createElement('td');
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa fa-trash-o';
  deleteIcon.style.cursor = 'pointer';
  deleteIcon.onclick = () => {
    if (confirm('Are you sure you want to delete this row?')) {
      row.remove();
      groupItems.splice(index, 1);
      sendableItems = sendableItems.filter((_, sendableIndex) => sendableIndex !== index);
      saveItems();
    }
  };
  deleteCell.appendChild(deleteIcon);
  row.appendChild(deleteCell);

  // Hide Column
  const hideCell = document.createElement('td');
  const hideIcon = document.createElement('i');
  hideIcon.className = 'fa fa-eye';
  hideIcon.classList.add('visibility-icon');
  hideIcon.style.cursor = 'pointer';

  // Check if the item is in sendableItems
  if (!sendableItems.some(si => si.type === item.type && si.message === item.message)) {
    hideIcon.classList.remove('fa-eye');
    hideIcon.classList.add('fa-eye-slash');
  }

  hideIcon.onclick = () => {
    toggleVisibility(hideIcon, typeCell, messageCell, index);
    localStorage.setItem('groupItems', JSON.stringify(groupItems));
    localStorage.setItem('sendableItems', JSON.stringify(sendableItems));
  };
  hideCell.appendChild(hideIcon);
  row.appendChild(hideCell);

  // Drag and Drop functionality
  addDragAndDropHandlers(row);

  tableBody.appendChild(row);
});

// Add Button functionality ------------------------------------------------------------------
document.getElementById('add_btn').addEventListener('click', () => {
  const newItem = { type: 'Free', message: 'New message' }; // Default values for the new item
  const newIndex = groupItems.length;
  groupItems.push(newItem);
  sendableItems.push(newItem); // Adding the new item to sendableItems as well

  // Append the new row to the table
  const row = document.createElement('tr');
  row.setAttribute('draggable', true);

  // Create Drag / Drop Handle
  const handleCell = document.createElement('td');
  const handleIcon = document.createElement('i');
  handleIcon.className = 'fa fa-bars';
  handleCell.appendChild(handleIcon);
  row.appendChild(handleCell);

  // Type cell with contenteditable
  const typeCell = document.createElement('td');
  typeCell.setAttribute('contenteditable', true);
  typeCell.textContent = newItem.type;
  typeCell.addEventListener('keypress', (event) => {
    const key = event.key.toUpperCase();
    if (['R', 'B', 'P', 'F'].includes(key)) {
      event.preventDefault(); // Prevent the default character input
      const fullText = { R: 'Results', B: 'Breaking', P: 'Promo', F: 'Free' }[key];
      typeCell.textContent = fullText;
      updateItem(Array.from(tableBody.children).indexOf(row), 'type', fullText);
    }
  });
  typeCell.addEventListener('blur', () => {
    updateItem(Array.from(tableBody.children).indexOf(row), 'type', typeCell.textContent);
  });
  row.appendChild(typeCell);

  // Message cell with contenteditable
  const messageCell = document.createElement('td');
  messageCell.setAttribute('contenteditable', true);
  messageCell.textContent = newItem.message;
  messageCell.addEventListener('blur', () => {
    updateItem(Array.from(tableBody.children).indexOf(row), 'message', messageCell.textContent);
  });
  row.appendChild(messageCell);

  // Delete Column
  const deleteCell = document.createElement('td');
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa fa-trash-o';
  deleteIcon.style.cursor = 'pointer';
  deleteIcon.onclick = () => {
    row.remove();
    groupItems.splice(newIndex, 1);
    sendableItems = sendableItems.filter((item, idx) => idx !== newIndex);
    localStorage.setItem('groupItems', JSON.stringify(groupItems));
    localStorage.setItem('sendableItems', JSON.stringify(sendableItems));
  };
  deleteCell.appendChild(deleteIcon);
  row.appendChild(deleteCell);

  // Hide Column
  const hideCell = document.createElement('td');
  const hideIcon = document.createElement('i');
  hideIcon.className = 'fa fa-eye';
  hideIcon.classList.add('visibility-icon');
  hideIcon.style.cursor = 'pointer';
  hideIcon.onclick = () => {
    toggleVisibility(hideIcon, typeCell, messageCell, newIndex);
    localStorage.setItem('groupItems', JSON.stringify(groupItems));
    localStorage.setItem('sendableItems', JSON.stringify(sendableItems));
  };
  hideCell.appendChild(hideIcon);
  row.appendChild(hideCell);

  // Drag and Drop functionality for the new row
  addDragAndDropHandlers(row);

  tableBody.appendChild(row);

  saveItems();
});

// Toggle visibility function ------------------------------------------------------------
function toggleVisibility(icon, typeCell, messageCell, index) {
  const currentItem = {
    type: typeCell.textContent,
    message: messageCell.textContent
  };

  if (icon.classList.contains('fa-eye')) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    sendableItems = sendableItems.filter(item => item.type !== currentItem.type || item.message !== currentItem.message);
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    if (!sendableItems.includes(groupItems[index])) {
      sendableItems.splice(index, 0, groupItems[index]);
    }
  }
}

// Drag and Drop functionality -----------------------------------------------------------
function addDragAndDropHandlers(row) {
  row.ondragstart = (event) => {
    const index = Array.from(tableBody.children).indexOf(row);
    event.dataTransfer.setData('text/plain', index.toString());
  };

  row.ondragover = (event) => {
    event.preventDefault();
  };

  row.ondrop = (event) => {
    event.preventDefault();
    const originIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const targetIndex = Array.from(tableBody.children).indexOf(row);

    if (targetIndex !== originIndex) {
      const elementToMove = tableBody.removeChild(tableBody.children[originIndex]);
      tableBody.insertBefore(elementToMove, tableBody.children[targetIndex] || null);

      // Update groupItems based on the new order
      const movedItem = groupItems.splice(originIndex, 1)[0];
      groupItems.splice(targetIndex, 0, movedItem);

      // Update sendableItems based on the new groupItems order
      sendableItems = groupItems.filter(item => sendableItems.some(si => si.type === item.type && si.message === item.message));

      saveItems();
    }
  };
}

// Function to update item type or message ----------------------------------------------
function updateItem(index, type, value) {
  // Update groupItems with the new type or message
  if (type === 'type') {
    groupItems[index].type = value;
  } else if (type === 'message') {
    groupItems[index].message = value;
  }

  // Reconstruct sendableItems based on visibility
  sendableItems = groupItems.filter((item, idx) => {
    const row = tableBody.children[idx];
    const visibilityIcon = row.querySelector('.visibility-icon'); // Selecting the visibility icon using its class
    return visibilityIcon && visibilityIcon.classList.contains('fa-eye'); // Include the item if the icon indicates visibility
  });

  // Save both groupItems and sendableItems
  saveItems();
}

// Save items to localStorage -----------------------------------------------------------
function saveItems() {
  localStorage.setItem('groupItems', JSON.stringify(groupItems));
  localStorage.setItem('sendableItems', JSON.stringify(sendableItems));
}