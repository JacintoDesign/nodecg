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
const resultsHeader = document.getElementById('results_header_text');
const resultsText1 = document.getElementById('results_text_1');
const resultsText2 = document.getElementById('results_text_2');
const resultsText3 = document.getElementById('results_text_3');
const eventsHeader = document.getElementById('events_header_text');
const eventsText1 = document.getElementById('events_text_1');
const eventsText2 = document.getElementById('events_text_2');
const eventsText3 = document.getElementById('events_text_3');
const eventsText4 = document.getElementById('events_text_4');
const eventsText5 = document.getElementById('events_text_5');
const breakingHeader = document.getElementById('breaking_header_text');
const breakingText1 = document.getElementById('breaking_text_1');
const breakingText2 = document.getElementById('breaking_text_2');
const breakingText3 = document.getElementById('breaking_text_3');
// Button Elements
const nextBtn = document.getElementById('next_btn');
const buttonSubmit = document.getElementById('submit_btn');
const buttonPlay = document.getElementById('in_btn');
const buttonClear = document.getElementById('out_btn');
// Replicants
const currentInfoIndexReplicant = nodecg.Replicant('currentInfoIndexReplicant');
const resultsHeaderReplicant = nodecg.Replicant('results_header_text');
const resultsText1Replicant = nodecg.Replicant('results_text_1');
const resultsText2Replicant = nodecg.Replicant('results_text_2');
const resultsText3Replicant = nodecg.Replicant('results_text_3');
const eventsHeaderReplicant = nodecg.Replicant('events_header_text');
const eventsText1Replicant = nodecg.Replicant('events_text_1');
const eventsText2Replicant = nodecg.Replicant('events_text_2');
const eventsText3Replicant = nodecg.Replicant('events_text_3');
const eventsText4Replicant = nodecg.Replicant('events_text_4');
const eventsText5Replicant = nodecg.Replicant('events_text_5');
const breakingHeaderReplicant = nodecg.Replicant('breaking_header_text');
const breakingText1Replicant = nodecg.Replicant('breaking_text_1');
const breakingText2Replicant = nodecg.Replicant('breaking_text_2');
const breakingText3Replicant = nodecg.Replicant('breaking_text_3');

resultsHeaderReplicant.on('change', (newValue) => {
    // do something with newValue
});
resultsText1Replicant.on('change', (newValue) => {
    // do something with newValue
});
resultsText2Replicant.on('change', (newValue) => {
    // do something with newValue
});
resultsText3Replicant.on('change', (newValue) => {
    // do something with newValue
});
eventsHeaderReplicant.on('change', (newValue) => {
    // do something with newValue
});
eventsText1Replicant.on('change', (newValue) => {
    // do something with newValue
});
eventsText2Replicant.on('change', (newValue) => {
    // do something with newValue
});
eventsText3Replicant.on('change', (newValue) => {
    // do something with newValue
});
eventsText4Replicant.on('change', (newValue) => {
    // do something with newValue
});
eventsText5Replicant.on('change', (newValue) => {
    // do something with newValue
});
breakingHeaderReplicant.on('change', (newValue) => {
    // do something with newValue
});
breakingText1Replicant.on('change', (newValue) => {
    // do something with newValue
});
breakingText2Replicant.on('change', (newValue) => {
    // do something with newValue
});
breakingText3Replicant.on('change', (newValue) => {
    // do something with newValue
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

document.addEventListener('DOMContentLoaded', () => {
    // Groups
    groups = [
      document.getElementById('results-group'),
      document.getElementById('events-group'),
      document.getElementById('breaking-group'),
    ];
});

// Show / hide groups
let groups = [];
let currentGroup = 0;

function switchGroup(direction) {
  groups[currentGroup].style.display = 'none';
  if (direction === 'forward') {
    currentGroup = (currentGroup + 1) % groups.length;
  } else if (direction === 'backward') {
    currentGroup = (currentGroup - 1 + groups.length) % groups.length;
  }
  groups[currentGroup].style.display = 'block';
}

// Add new variables for the arrow buttons
const prevChannelBtn = document.getElementById('prev_channel');
const nextChannelBtn = document.getElementById('next_channel');

// Previous Page
prevChannelBtn.onclick = () => {
  switchGroup('backward');
};

// Next Page
nextChannelBtn.onclick = () => {
  switchGroup('forward');
};

// Page Values
let channelInfos = [
    { type: 'results', header: 'RESULTS!', title: '', text1: 'Mark McMorris Won', text2: "Canada's First", text3: 'Medal of the games.', time1: '', time2: '', time3: '' },
    { type: 'events', header: 'TODAY!', title: 'Snowboard Cross', text1: "Men's Semi-Finals", text2: "", text3: '', time1: '3:00', time2: 'PM', time3: 'ET' },
    { type: 'breaking', header: 'BREAKING!', title: '', text1: 'Lapointe found not', text2: "guilty for taking", text3: 'banned substance', time1: '', time2: '', time3: '' },
];

function populateChannelInfo() {
    channelInfos.forEach(info => {
        let groupElement = document.getElementById(`${info.type}-group`);

        if (groupElement) {
            if (info.header) {
                let headerElement = groupElement.querySelector(`#${info.type}_header_text`);
                if (headerElement) headerElement.textContent = info.header;
            }

            for (let i = 1; i <= 3; i++) {
                let textElement = groupElement.querySelector(`#${info.type}_text_${i}`);
                if (textElement) {
                    if (info.type === 'events') {
                        if (i === 1) {
                            textElement.textContent = info.title;
                        } else if (i === 2) {
                            textElement.textContent = info.text1;
                        }
                    } else {
                        textElement.textContent = info[`text${i}`];
                    }
                }
            }

            if (info.type === 'events') {
                for (let i = 1; i <= 3; i++) {
                    let timeElement = groupElement.querySelector(`#${info.type}_text_${2 + i}`);
                    if (timeElement && info[`time${i}`]) timeElement.textContent = info[`time${i}`];
                }
            }
        }
    });
}

// Call the function to populate the channel info
populateChannelInfo();












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
