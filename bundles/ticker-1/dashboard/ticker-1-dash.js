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
const currentInfoIndexReplicantTicker = nodecg.Replicant('currentInfoIndexReplicantTicker');
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
    resultsHeader.value = newValue;
});

resultsText1Replicant.on('change', (newValue) => {
    resultsText1.value = newValue;
});

resultsText2Replicant.on('change', (newValue) => {
    resultsText2.value = newValue;
});

resultsText3Replicant.on('change', (newValue) => {
    resultsText3.value = newValue;
});

eventsHeaderReplicant.on('change', (newValue) => {
    eventsHeader.value = newValue;
});

eventsText1Replicant.on('change', (newValue) => {
    eventsText1.value = newValue;
});

eventsText2Replicant.on('change', (newValue) => {
    eventsText2.value = newValue;
});

eventsText3Replicant.on('change', (newValue) => {
    eventsText3.value = newValue;
});

eventsText4Replicant.on('change', (newValue) => {
    eventsText4.value = newValue;
});

eventsText5Replicant.on('change', (newValue) => {
    eventsText5.value = newValue;
});

breakingHeaderReplicant.on('change', (newValue) => {
    breakingHeader.value = newValue;
});

breakingText1Replicant.on('change', (newValue) => {
    breakingText1.value = newValue;
});

breakingText2Replicant.on('change', (newValue) => {
    breakingText2.value = newValue;
});

breakingText3Replicant.on('change', (newValue) => {
    breakingText3.value = newValue;
});

// Listen for changes in the Replicant value
currentInfoIndexReplicantTicker.on('change', (newIndex) => {
    // Handle the new value
    if (isAuto) {
        console.log('Ticker New Index:', newIndex);
        switchGroupByIndex(newIndex);
    }
});

// Handle Submit Btn
buttonSubmit.onclick = () => {
    if (resultsHeaderReplicant && resultsHeader) resultsHeaderReplicant.value = resultsHeader.innerText;
    if (resultsText1Replicant && resultsText1) resultsText1Replicant.value = resultsText1.innerText;
    if (resultsText2Replicant && resultsText2) resultsText2Replicant.value = resultsText2.innerText;
    if (resultsText3Replicant && resultsText3) resultsText3Replicant.value = resultsText3.innerText;
    if (eventsHeaderReplicant && eventsHeader) eventsHeaderReplicant.value = eventsHeader.innerText;
    if (eventsText1Replicant && eventsText1) eventsText1Replicant.value = eventsText1.innerText;
    if (eventsText2Replicant && eventsText2) eventsText2Replicant.value = eventsText2.innerText;
    if (eventsText3Replicant && eventsText3) eventsText3Replicant.value = eventsText3.innerText;
    if (eventsText4Replicant && eventsText4) eventsText4Replicant.value = eventsText4.innerText;
    if (eventsText5Replicant && eventsText5) eventsText5Replicant.value = eventsText5.innerText;
    if (breakingHeaderReplicant && breakingHeader) breakingHeaderReplicant.value = breakingHeader.innerText;
    if (breakingText1Replicant && breakingText1) breakingText1Replicant.value = breakingText1.innerText;
    if (breakingText2Replicant && breakingText2) breakingText2Replicant.value = breakingText2.innerText;
    if (breakingText3Replicant && breakingText3) breakingText3Replicant.value = breakingText3.innerText;
    nodecg.sendMessage('update');
    console.log(
        resultsHeaderReplicant.value,
        resultsText1Replicant.value,
        resultsText2Replicant.value,
        resultsText3Replicant.value,
        eventsHeaderReplicant.value,
        eventsText1Replicant.value,
        eventsText2Replicant.value,
        eventsText3Replicant.value,
        eventsText4Replicant.value,
        eventsText5Replicant.value,
        breakingHeaderReplicant.value,
        breakingText1Replicant.value,
        breakingText2Replicant.value,
        breakingText3Replicant.value
    );
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

function switchGroupByIndex(index) {
    if (index < 0 || index >= groups.length) {
      console.error("Invalid index provided");
      return;
    }

    // Hide the current group
    groups[currentGroup].style.display = 'none';
  
    // Update the current group index
    currentGroup = index;
  
    // Show the new group
    groups[currentGroup].style.display = 'block';
  }

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
let tickerPages = [
    { type: 'results', header: 'RESULTS!', title: '', text1: 'Mark McMorris Won', text2: "Canada's First", text3: 'Medal of the games.', time1: '', time2: '', time3: '' },
    { type: 'events', header: 'TODAY!', title: 'Snowboard Cross', text1: "Men's Semi-Finals", text2: "", text3: '', time1: '3:00', time2: 'PM', time3: 'ET' },
    { type: 'breaking', header: 'BREAKING!', title: '', text1: 'Lapointe found not', text2: "guilty for taking", text3: 'banned substance', time1: '', time2: '', time3: '' },
];

function populatePages() {
    tickerPages.forEach(page => {
        let groupElement = document.getElementById(`${page.type}-group`);

        if (groupElement) {
            if (page.header) {
                let headerElement = groupElement.querySelector(`#${page.type}_header_text`);
                if (headerElement) headerElement.textContent = page.header;
            }

            for (let i = 1; i <= 3; i++) {
                let textElement = groupElement.querySelector(`#${page.type}_text_${i}`);
                if (textElement) {
                    if (page.type === 'events') {
                        if (i === 1) {
                            textElement.textContent = page.title;
                        } else if (i === 2) {
                            textElement.textContent = page.text1;
                        }
                    } else {
                        textElement.textContent = page[`text${i}`];
                    }
                }
            }

            if (page.type === 'events') {
                for (let i = 1; i <= 3; i++) {
                    let timeElement = groupElement.querySelector(`#${page.type}_text_${2 + i}`);
                    if (timeElement && page[`time${i}`]) timeElement.textContent = page[`time${i}`];
                }
            }
        }
    });
}

// Call the function to populate the pages
populatePages();
loadTickerPages();

// Add a new variable to keep track of the current channel index
let currentChannelIndex = 0;

// Add a new function to update the text elements with the values from the tickerPages array
function updateTextElements(tickerPage) {
    resultsHeader.textContent = tickerPage.resultsHeader;
    resultsText1.textContent = tickerPage.resultsText1;
    resultsText2.textContent = tickerPage.resultsText2;
    resultsText3.textContent = tickerPage.resultsText3;
    eventsHeader.textContent = tickerPage.eventsHeader;
    eventsText1.textContent = tickerPage.eventsText1;
    eventsText2.textContent = tickerPage.eventsText2;
    eventsText3.textContent = tickerPage.eventsText3;
    eventsText4.textContent = tickerPage.eventsText4;
    eventsText5.textContent = tickerPage.eventsText5;
    breakingHeader.textContent = tickerPage.breakingHeader;
    breakingText1.textContent = tickerPage.breakingText1;
    breakingText2.textContent = tickerPage.breakingText2;
    breakingText3.textContent = tickerPage.breakingText3;
}

// Add input event listeners for contenteditable elements to update the tickerPages array
resultsHeader.addEventListener('input', updateTickerPage);
resultsText1.addEventListener('input', updateTickerPage);
resultsText2.addEventListener('input', updateTickerPage);
resultsText3.addEventListener('input', updateTickerPage);
eventsHeader.addEventListener('input', updateTickerPage);
eventsText1.addEventListener('input', updateTickerPage);
eventsText2.addEventListener('input', updateTickerPage);
eventsText3.addEventListener('input', updateTickerPage);
eventsText4.addEventListener('input', updateTickerPage);
eventsText5.addEventListener('input', updateTickerPage);
breakingHeader.addEventListener('input', updateTickerPage);
breakingText1.addEventListener('input', updateTickerPage);
breakingText2.addEventListener('input', updateTickerPage);
breakingText3.addEventListener('input', updateTickerPage);

// Update the updateTickerPage function to also save the updated array to localStorage
function updateTickerPage() {
    tickerPages[currentGroup] = {
        resultsHeader: resultsHeader.innerText,
        resultsText1: resultsText1.innerText,
        resultsText2: resultsText2.innerText,
        resultsText3: resultsText3.innerText,
        eventsHeader: eventsHeader.innerText,
        eventsText1: eventsText1.innerText,
        eventsText2: eventsText2.innerText,
        eventsText3: eventsText3.innerText,
        eventsText4: eventsText4.innerText,
        eventsText5: eventsText5.innerText,
        breakingHeader: breakingHeader.innerText,
        breakingText1: breakingText1.innerText,
        breakingText2: breakingText2.innerText,
        breakingText3: breakingText3.innerText
    };
    saveTickerPages(); // Save the updated array to localStorage
} 

// Add a function to save the tickerPages array to localStorage
function saveTickerPages() {
    localStorage.setItem('tickerPages', JSON.stringify(tickerPages));
}

// Add a function to load the tickerPages array from localStorage if it exists
function loadTickerPages() {
    const storedTickerPages = localStorage.getItem('tickerPages');
    if (storedTickerPages) {
        tickerPages = JSON.parse(storedTickerPages);
        updateTextElements(tickerPages[currentGroup]);
    }
}
