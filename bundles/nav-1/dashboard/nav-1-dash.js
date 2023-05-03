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
    // The value of the Replicant has changed somewhere in NodeCG,
    // this could be another dashboard panel, a server initiated change,
    // or the doing of another user accessing your dashboard panel.
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
