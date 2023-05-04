// 	const netCBCRep = nodecg.Replicant('netCBC');
// 	const netTSNRep = nodecg.Replicant('netTSN');
// 	const netRSNRep = nodecg.Replicant('netRSN');

// function netCheck() {
//   // Get the checkbox
//   var CBCcheck = document.getElementById("netCBC");
//   var TSNcheck = document.getElementById("netTSN");
//   var RSNcheck = document.getElementById("netRSN");

//   if (CBCcheck.checked == true){
//     netCBCRep.value = "true";
//   } else {
//     netCBCRep.value = "false";
//   }
  
//   if (TSNcheck.checked == true){
//     netTSNRep.value = "true";
//   } else {
//     netTSNRep.value = "false";
//   }
  
//   if (RSNcheck.checked == true){
//     netRSNRep.value = "true";
//   } else {
//     netRSNRep.value = "false";
//   }

//   console.log("CBC", netCBCRep.value); 
//   console.log("TSN", netTSNRep.value);
//   console.log("RSN", netRSNRep.value);
// }


// Preview Elements
const headerInput = document.getElementById('header_text');
const titleInput = document.getElementById('title_text');
const time1 = document.getElementById('time-1');
const time2 = document.getElementById('time-2');
const time3 = document.getElementById('time-3');
const footerInput = document.getElementById('nav_footer_text');
// Button Elements
const nextBtn = document.getElementById('next_btn');
const buttonSubmit = document.getElementById('submit_btn');
const buttonPlay = document.getElementById('in_btn');
const buttonClear = document.getElementById('out_btn');
// Replicants
const currentInfoIndexReplicant = nodecg.Replicant('currentInfoIndexReplicant');
const headerReplicant = nodecg.Replicant('header');
const titleReplicant = nodecg.Replicant('title');
const time1Replicant = nodecg.Replicant('time-1');
const time2Replicant = nodecg.Replicant('time-2');
const time3Replicant = nodecg.Replicant('time-3');
const footerReplicant = nodecg.Replicant('footer');

headerReplicant.on('change', (newValue) => {
    headerInput.value = newValue;
});
titleReplicant.on('change', (newValue) => {
    titleInput.value = newValue;
});
time1Replicant.on('change', (newValue) => {
    time1.value = newValue;
});
time2Replicant.on('change', (newValue) => {
    time2.value = newValue;
});
time3Replicant.on('change', (newValue) => {
    time3.value = newValue;
});
footerReplicant.on('change', (newValue) => {
    footerInput.value = newValue;
});

// Listen for changes in the Replicant value
currentInfoIndexReplicant.on('change', (newIndex) => {
    // Handle the new value
    if (isAuto) {
        console.log('New Index:', newIndex);
        updateTextElements(channelInfos[newIndex]);
    } else {
        console.log('Current Index:', currentChannelIndex);
        updateTextElements(channelInfos[currentChannelIndex]);
    }
});

// Handle Submit Btn
buttonSubmit.onclick = () => {
    titleReplicant.value = titleInput.innerText;
    headerReplicant.value = headerInput.innerText;
    time1Replicant.value = time1.innerText;
    time2Replicant.value = time2.innerText;
    time3Replicant.value = time3.innerText;
    footerReplicant.value = footerInput.innerText;
    nodecg.sendMessage('update');
    console.log(titleReplicant.value, headerReplicant.value, time1Replicant.value, time2Replicant.value, time3Replicant.value, 'text');
};

// Animate In
buttonPlay.onclick = () => {
    isAuto = false;
    console.log("play");
    nodecg.sendMessage('play');
};

// Animate Out
buttonClear.onclick = () => {
    isAuto = false;
    console.log("stop");
    nodecg.sendMessage('stop');
};

// Next Page
nextBtn.onclick = () => {
    isAuto = true;
    console.log("next");
    nodecg.sendMessage('next');
};

// Start / Stop Interval
let isAuto = true;
const intervalInput = document.getElementById('interval_input');
const startIntervalBtn = document.getElementById('start_interval_btn');
const stopIntervalBtn = document.getElementById('stop_interval_btn');
let autoNextInterval;
let countdownValue;
let countdownTimerId;

startIntervalBtn.onclick = () => {
    isAuto = true;
    clearInterval(autoNextInterval);
    clearInterval(countdownTimerId); // Clear the existing countdown timer
    const intervalSeconds = parseInt(intervalInput.value);
    countdownValue = intervalSeconds; // Set the initial countdown value

    if (intervalSeconds > 0) {
        autoNextInterval = setInterval(() => {
            nodecg.sendMessage('next');
            countdownValue = intervalSeconds; // Reset the countdown value
        }, intervalSeconds * 1000);

        // Start the countdown timer
        startCountdownTimer();
    }
};

stopIntervalBtn.onclick = () => {
    isAuto = false;
    clearInterval(autoNextInterval);
    clearInterval(countdownTimerId); // Clear the countdown timer
    document.getElementById('countdown').textContent = ''; // Clear the countdown display
}

function startCountdownTimer() {
  countdownTimerId = setInterval(() => {
    countdownValue -= 1;
    updateCountdownDisplay(countdownValue);

    if (countdownValue <= 0) {
      countdownValue = parseInt(intervalInput.value);
    }
  }, 1000);
}

function updateCountdownDisplay(value) {
  document.getElementById('countdown').textContent = `${value}s`;
}









// Page Values
let channelInfos = [
    { header: 'CBC', title: 'Alpine Skiing', time1: '11:30', time2: 'AM', time3: 'ET', day: 'Today' },
    { header: 'TSN', title: 'Freestyle Halfpipe', time1: '8:00', time2: 'AM', time3: 'ET', day: 'Today' },
    { header: 'SN', title: 'Ski Jumping', time1: '3:00', time2: 'PM', time3: 'ET', day: 'Tuesday' },
    { header: 'TSN2', title: 'Biathalon', time1: '1:30', time2: 'PM', time3: 'ET', day: 'Friday' },
    { header: 'SN1', title: 'Nordic Combined', time1: '11:00', time2: 'PM', time3: 'ET', day: 'Tonight' }
];
  
// Add new variables for the arrow buttons
const prevChannelBtn = document.getElementById('prev_channel');
const nextChannelBtn = document.getElementById('next_channel');

// Add a new variable to keep track of the current channel index
let currentChannelIndex = 0;

// Add a new function to update the text elements with the values from the channelInfos array
function updateTextElements(channelInfo) {
    headerInput.textContent = channelInfo.header;
    titleInput.textContent = channelInfo.title;
    time1.textContent = channelInfo.time1;
    time2.textContent = channelInfo.time2;
    time3.textContent = channelInfo.time3;
    footerInput.textContent = channelInfo.day;
}

// Add input event listeners for contenteditable elements to update the channelInfos array
headerInput.addEventListener('input', updateChannelInfo);
titleInput.addEventListener('input', updateChannelInfo);
time1.addEventListener('input', updateChannelInfo);
time2.addEventListener('input', updateChannelInfo);
time3.addEventListener('input', updateChannelInfo);
footerInput.addEventListener('input', updateChannelInfo);

// Previous Page
prevChannelBtn.onclick = () => {
    isAuto = false;
    currentChannelIndex--;
    if (currentChannelIndex < 0) {
        currentChannelIndex = channelInfos.length - 1;
    }
    updateTextElements(channelInfos[currentChannelIndex]);
};

// Next Page
nextChannelBtn.onclick = () => {
    isAuto = false;
    currentChannelIndex++;
    if (currentChannelIndex >= channelInfos.length) {
        currentChannelIndex = 0;
    }
    updateTextElements(channelInfos[currentChannelIndex]);
};

// Add a new variable for the add channel button
const addChannelBtn = document.getElementById('add_channel_btn');

// Add default values for new channels
const defaultChannelInfo = {
  header: 'Network',
  title: 'Title',
  time1: '12:00',
  time2: 'AM',
  time3: 'ET',
  day: 'day'
};

// Update the addChannelBtn.onclick function to also save the updated array to localStorage
addChannelBtn.onclick = () => {
    isAuto = false;
    channelInfos.push({ ...defaultChannelInfo });
    currentChannelIndex = channelInfos.length - 1;
    updateTextElements(channelInfos[currentChannelIndex]);
    saveChannelInfos(); // Save the updated array to localStorage
};

// Add a function to save the channelInfos array to localStorage
function saveChannelInfos() {
    localStorage.setItem('channelInfos', JSON.stringify(channelInfos));
}

// Add a function to load the channelInfos array from localStorage if it exists
function loadChannelInfos() {
    const storedChannelInfos = localStorage.getItem('channelInfos');
    if (storedChannelInfos) {
        channelInfos = JSON.parse(storedChannelInfos);
        updateTextElements(channelInfos[currentChannelIndex]);
    }
}

// Update the updateChannelInfo function to also save the updated array to localStorage
function updateChannelInfo() {
    channelInfos[currentChannelIndex] = {
        header: headerInput.innerText,
        title: titleInput.innerText,
        time1: time1.innerText,
        time2: time2.innerText,
        time3: time3.innerText,
        day: footerInput.innerText
    };
    saveChannelInfos(); // Save the updated array to localStorage
}
  
// Wrap the loadChannelInfos function call inside the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    loadChannelInfos();
});
