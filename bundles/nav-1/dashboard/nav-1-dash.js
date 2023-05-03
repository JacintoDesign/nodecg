const headerInput = document.querySelector('#header_text');
const titleInput = document.querySelector('#title_text');
const time1 = document.getElementById('time-1');
const time2 = document.getElementById('time-2');
const time3 = document.getElementById('time-3');

const nextBtn = document.getElementById('next_btn');
const buttonSubmit = document.getElementById('submit_btn');
const buttonPlay = document.getElementById('in_btn');
const buttonClear = document.getElementById('out_btn');

const headerReplicant = nodecg.Replicant('header');
const titleReplicant = nodecg.Replicant('title');
const time1Rep = nodecg.Replicant('time-1');
const time2Rep = nodecg.Replicant('time-2');
const time3Rep = nodecg.Replicant('time-3');

headerReplicant.on('change', (newValue, oldValue) => {
    // The value of the Replicant has changed somewhere in NodeCG,
    // this could be another dashboard panel, a server initiated change,
    // or the doing of another user accessing your dashboard panel.
    headerInput.value = newValue;
});   
titleReplicant.on('change', (newValue, oldValue) => {
    titleInput.value = newValue;
});

buttonSubmit.onclick = () => {
    // A Replicant can be modified by modifying its `value`.
    titleReplicant.value = titleInput.value;
    headerReplicant.value = headerInput.value;
    time1Rep.value = time1.value;
    time2Rep.value = time2.value;
    time3Rep.value = time3.value;
    console.log('text');
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
    console.log("stop");
    nodecg.sendMessage('next');
};
