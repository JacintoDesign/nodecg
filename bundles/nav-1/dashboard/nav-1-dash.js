const headerInput = document.getElementById('header_text');
const titleInput = document.getElementById('title_text');
const time1 = document.getElementById('time-1');
const time2 = document.getElementById('time-2');
const time3 = document.getElementById('time-3');
const footerInput = document.getElementById('nav_footer_text');

const nextBtn = document.getElementById('next_btn');
const buttonSubmit = document.getElementById('submit_btn');
const buttonPlay = document.getElementById('in_btn');
const buttonClear = document.getElementById('out_btn');

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

buttonSubmit.onclick = () => {
    // A Replicant can be modified by modifying its `value`.
    titleReplicant.value = titleInput.innerText;
    headerReplicant.value = headerInput.innerText;
    time1Replicant.value = time1.innerText;
    time2Replicant.value = time2.innerText;
    time3Replicant.value = time3.innerText;
    footerReplicant.value = footerInput.innerText;
    console.log(titleReplicant.value, headerReplicant.value, time1Replicant.value, time2Replicant.value, time3Replicant.value, 'text');
};

buttonPlay.onclick = () => {
    console.log("play");
    nodecg.sendMessage('play');
};

buttonClear.onclick = () => {
    console.log("stop");
    nodecg.sendMessage('stop');
};

nextBtn.onclick = () => {
    console.log("next");
    nodecg.sendMessage('next');
};

const intervalInput = document.getElementById('interval_input');
const intervalBtn = document.getElementById('interval_btn');
let autoNextInterval;

intervalBtn.onclick = () => {
    clearInterval(autoNextInterval);
    const intervalSeconds = parseInt(intervalInput.value);
    if (intervalSeconds > 0) {
        autoNextInterval = setInterval(() => {
            nodecg.sendMessage('next');
        }, intervalSeconds * 1000);
    }
};

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

// Add a new function to update the channelInfos array with the current contenteditable values
function updateChannelInfo() {
    channelInfos[currentChannelIndex] = {
        header: headerInput.textContent,
        title: titleInput.textContent,
        time1: time1.textContent,
        time2: time2.textContent,
        time3: time3.textContent,
        day: footerInput.textContent
    };
    console.log(channelInfos[currentChannelIndex], channelInfos);
}

// Add input event listeners for contenteditable elements to update the channelInfos array
headerInput.addEventListener('input', updateChannelInfo);
titleInput.addEventListener('input', updateChannelInfo);
time1.addEventListener('input', updateChannelInfo);
time2.addEventListener('input', updateChannelInfo);
time3.addEventListener('input', updateChannelInfo);
footerInput.addEventListener('input', updateChannelInfo);

// Add event listeners for the arrow buttons
prevChannelBtn.onclick = () => {
    currentChannelIndex--;
    if (currentChannelIndex < 0) {
        currentChannelIndex = channelInfos.length - 1;
    }
    updateTextElements(channelInfos[currentChannelIndex]);
};

nextChannelBtn.onclick = () => {
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
  