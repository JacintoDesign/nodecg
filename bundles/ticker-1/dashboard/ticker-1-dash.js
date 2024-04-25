// Button Elements
const nextBtn = document.getElementById('next_btn');
const buttonPlay = document.getElementById('in_btn');
const buttonClear = document.getElementById('out_btn');
// Replicants
const tickerItemsReplicant = nodecg.Replicant('tickerItems', { defaultValue: [] });
const refreshIntervalReplicant = nodecg.Replicant('refreshInterval');

// Animate In
buttonPlay.onclick = () => {
  updateItems();
  setTimeout(() => {
    console.log('play');
    nodecg.sendMessage('play');
  }, 100);
};

// Animate Out
buttonClear.onclick = () => {
  console.log('stop');
  nodecg.sendMessage('stop');
};

// Next Page
nextBtn.onclick = () => {
  console.log('next');
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
const CBCcheck = document.getElementById('netCBC');
const TSNcheck = document.getElementById('netTSN');
const RSNcheck = document.getElementById('netRSN');
const netCBCStoredValue = localStorage.getItem('tickerCBC');
const netTSNStoredValue = localStorage.getItem('tickerTSN');
const netRSNStoredValue = localStorage.getItem('tickerRSN');
const netCBCRep = nodecg.Replicant('netCBC');
const netTSNRep = nodecg.Replicant('netTSN');
const netRSNRep = nodecg.Replicant('netRSN');

if (netCBCStoredValue !== null) {
  CBCcheck.checked = netCBCStoredValue === 'true';
}

if (netTSNStoredValue !== null) {
  TSNcheck.checked = netTSNStoredValue === 'true';
}

if (netRSNStoredValue !== null) {
  RSNcheck.checked = netRSNStoredValue === 'true';
}

// Save Checkbox Value
function netCheck() {
  // Get the checkbox
  if (CBCcheck.checked == true) {
    netCBCRep.value = 'true';
  } else {
    netCBCRep.value = 'false';
  }

  if (TSNcheck.checked == true) {
    netTSNRep.value = 'true';
  } else {
    netTSNRep.value = 'false';
  }

  if (RSNcheck.checked == true) {
    netRSNRep.value = 'true';
  } else {
    netRSNRep.value = 'false';
  }

  localStorage.setItem('tickerCBC', CBCcheck.checked);
  localStorage.setItem('tickerTSN', TSNcheck.checked);
  localStorage.setItem('tickerRSN', RSNcheck.checked);
}

// Populate the table with tickerItems ------------------------------------------
const tableBody = document.getElementById('table-body');

function addTableRow(item) {
  const index = tickerItems.indexOf(item);
  const row = document.createElement('tr');
  row.setAttribute('data-index', index);
  row.id = `ticker-row-${index}`;

  // Create Drag / Drop Handle
  const handleCell = document.createElement('td');
  const handleIcon = document.createElement('i');
  handleIcon.className = 'fa fa-bars';
  handleCell.appendChild(handleIcon);
  row.appendChild(handleCell);

  // Type Cell with dropdown
  const typeCell = document.createElement('td');
  const select = document.createElement('select');
  select.className = 'type-cell';
  const options = ['Results', 'Breaking', 'Promo', 'Free'];
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
  select.value = item.type; // Set the initial value based on item's current type

  // Append the select element to the cell
  typeCell.appendChild(select);
  row.appendChild(typeCell);

  // Message cell with contenteditable
  const messageCell = document.createElement('td');
  const message = document.createElement('span');
  message.className = 'message-cell';
  message.setAttribute('contenteditable', true);
  message.textContent = item.message;
  messageCell.appendChild(message);
  row.appendChild(messageCell);

  // Delete Column
  const deleteCell = document.createElement('td');
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa fa-trash-o';
  deleteIcon.style.cursor = 'pointer';
  deleteIcon.onclick = () => {
    if (confirm('Are you sure you want to delete this row?')) {
      row.remove();
      tickerItems.splice(index, 1);
      sendableTickerItems = sendableTickerItems.filter((_, sendableIndex) => sendableIndex !== index);
      saveItems();
    }
  };
  deleteCell.appendChild(deleteIcon);
  row.appendChild(deleteCell);

  // Visibility Column
  const hideCell = document.createElement('td');
  const hideIcon = document.createElement('i');
  hideIcon.className = item.visible ? 'fa fa-eye visibility-icon' : 'fa fa-eye-slash visibility-icon';
  hideIcon.style.cursor = 'pointer';
  select.style.opacity = item.visible ? '1' : '0.5';
  message.style.opacity = item.visible ? '1' : '0.5';
  hideIcon.onclick = () => toggleVisibility(hideIcon);

  hideCell.appendChild(hideIcon);
  row.appendChild(hideCell);

  // Drag and Drop functionality
  addDragAndDropHandlers(row);

  tableBody.appendChild(row);
}

// Add Button functionality ------------------------------------------------------------------
function addNewTableRow() {
  const newItem = { type: 'Free', message: 'New message' };
  newItem.visible = true;
  tickerItems.push(newItem);
  addTableRow(newItem);
  updateSendableTickerItems();
  saveItems();
}

// Toggle visibility function ------------------------------------------------------------
function toggleVisibility(icon) {
  const tr = icon.closest('tr');
  const table = tr.closest('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  const index = rows.indexOf(tr);
  const item = tickerItems[index];
  const typeSelect = tr.querySelector('.type-cell');
  const message = tr.querySelector('.message-cell');

  item.visible = !item.visible;
  if (!item.visible) {
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    typeSelect.style.opacity = '0.5';
    message.style.opacity = '0.5';
    // Remove the item from sendableTickerItems
    sendableTickerItems = sendableTickerItems.filter(x => x !== item);
    item.visible = false;
  } else {
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    typeSelect.style.opacity = '1';
    message.style.opacity = '1';
    item.visible = true;
    // Add the item back to sendableTickerItems if it's not already included
    if (!sendableTickerItems.includes(item)) {
      sendableTickerItems.splice(index, 0, item);
    }
  }
  saveItems();
}

// Drag and Drop functionality -----------------------------------------------------------
function addDragAndDropHandlers(row) {
  row.setAttribute('draggable', true);
  let dragCounter = 0;

  row.ondragstart = (event) => {
    const index = Array.from(tableBody.children).indexOf(row);
    event.dataTransfer.setData('text/plain', index.toString());
    event.dataTransfer.effectAllowed = 'move';
    row.classList.add('dragging');
  };

  row.ondragend = (event) => {
    row.classList.remove('dragging');
    dragCounter = 0;  // Reset counter when drag ends
  };

  row.ondragover = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  row.ondragenter = (event) => {
    event.preventDefault();
    if (dragCounter++ === 0) {  // Increment and check if it's the first entry
      row.classList.add('highlight');
    }
  };

  row.ondragleave = (event) => {
    if (--dragCounter === 0) {  // Decrement and check if it matches zero
      row.classList.remove('highlight');
    }
  };

  row.ondrop = (event) => {
    event.preventDefault();
    const originIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const targetIndex = Array.from(tableBody.children).indexOf(row);

    if (targetIndex !== originIndex) {
      const elementToMove = tableBody.removeChild(tableBody.children[originIndex]);
      tableBody.insertBefore(elementToMove, tableBody.children[targetIndex] || null);

      // Update tickerItems based on the new order
      const movedItem = tickerItems.splice(originIndex, 1)[0];
      tickerItems.splice(targetIndex, 0, movedItem);

      // Update sendableTickerItems based on the new tickerItems order
      updateSendableTickerItems();
      saveItems();
    }
    Array.from(tableBody.children).forEach(child => child.classList.remove('highlight'));
  };
}

// Update Group / Sendable Items
function updateItems() {
  const rows = document.querySelectorAll('#table-body tr');
  rows.forEach((row, index) => {
    const dropdown = row.querySelector('td select');
    const dropdownValue = dropdown.value;
    const typeValue = dropdownValue;
    const messageText = row.querySelector('.message-cell').textContent;

    if (tickerItems[index]) {
      tickerItems[index].type = typeValue;
      tickerItems[index].message = messageText;
    }
  });
  updateSendableTickerItems();
  saveItems();
  // Update items in Ticker graphic
  nodecg.sendMessage('update');
  tickerItemsReplicant.value = sendableTickerItems;
}

// Generate Table Rows
function generateTableRows() {
  tableBody.innerHTML = ''; // Clear the table first

  tickerItems.forEach((item) => {
    addTableRow(item); // Adjust index for IDs
  });
}

// Update sendableTickerItems
function updateSendableTickerItems() {
  sendableTickerItems = tickerItems.filter(item => item.visible);
}

// Initial Setup Save / Load -----------------------------------------------------------
let tickerItems = [];
let sendableTickerItems = [];

function saveItems() {
  localStorage.setItem('tickerItems', JSON.stringify(tickerItems));
  localStorage.setItem('sendableTickerItems', JSON.stringify(sendableTickerItems));
}

function loadItems() {
  if (localStorage.getItem('tickerItems') && localStorage.getItem('sendableTickerItems')) {
    // Parse the stored JSON data
    tickerItems = JSON.parse(localStorage.getItem('tickerItems'));
    sendableTickerItems = JSON.parse(localStorage.getItem('sendableTickerItems'));
  } else {
    // Default values if nothing is in localStorage
    tickerItems = [
      { type: 'Results', message: '100 Meter World Record Holder' },
      { type: 'Results', message: '200 Meter World Record Holder' },
      { type: 'Breaking', message: 'New Marathon Record' },
      { type: 'Breaking', message: 'Canadian swimmers set World Record' },
      { type: 'Promo', message: 'Upcoming: World Championship' },
      { type: 'Free', message: 'Tension as Olympics approach' },
    ];
    tickerItems.forEach((item) => {
      item.visible = true;
    });
    sendableTickerItems = [...tickerItems];
    saveItems();
  }
  generateTableRows();
}

loadItems();
