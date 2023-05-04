document.addEventListener('DOMContentLoaded', () => {
  populatePages();

  // Groups
  groups = [
    document.getElementById('results-group'),
    document.getElementById('events-group'),
    document.getElementById('breaking-group'),
  ];

  // Animate In
  nodecg.listenFor('play', () => {
    animateIn();
    console.log('in');
  });

  // Animate Out
  nodecg.listenFor('stop', () => {
    animateOut();
    console.log('out');
  });

  // Animate Next
  nodecg.listenFor('next', () => {
    switchGroup();
    console.log('next');
  });

  // NodeCG Related ------------------- 
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
  // Elements
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

  // Text Update on Replicant Change
  resultsHeaderReplicant.on('change', (newValue) => {
    if (newValue && resultsHeader) resultsHeader.textContent = newValue;
  });

  resultsText1Replicant.on('change', (newValue) => {
    if (newValue && resultsText1) resultsText1.textContent = newValue;
  });

  resultsText2Replicant.on('change', (newValue) => {
    if (newValue && resultsText2) resultsText2.textContent = newValue;
  });

  resultsText3Replicant.on('change', (newValue) => {
    if (newValue && resultsText3) resultsText3.textContent = newValue;
  });

  eventsHeaderReplicant.on('change', (newValue) => {
    if (newValue && eventsHeader) eventsHeader.textContent = newValue;
  });

  eventsText1Replicant.on('change', (newValue) => {
    if (newValue && eventsText1) eventsText1.textContent = newValue;
  });

  eventsText2Replicant.on('change', (newValue) => {
    if (newValue && eventsText2) eventsText2.textContent = newValue;
  });

  eventsText3Replicant.on('change', (newValue) => {
    if (newValue && eventsText3) eventsText3.textContent = newValue;
  });

  eventsText4Replicant.on('change', (newValue) => {
    if (newValue && eventsText4) eventsText4.textContent = newValue;
  });

  eventsText5Replicant.on('change', (newValue) => {
    if (newValue && eventsText5) eventsText5.textContent = newValue;
  });

  breakingHeaderReplicant.on('change', (newValue) => {
    if (newValue && breakingHeader) breakingHeader.textContent = newValue;
  });

  breakingText1Replicant.on('change', (newValue) => {
    if (newValue && breakingText1) breakingText1.textContent = newValue;
  });

  breakingText2Replicant.on('change', (newValue) => {
    if (newValue && breakingText2) breakingText2.textContent = newValue;
  });

  breakingText3Replicant.on('change', (newValue) => {
    if (newValue && breakingText3) breakingText3.textContent = newValue;
  });

});

// Ticker Pages
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
        let headerElement = groupElement.querySelector(`[id='${page.type}_header_text']`);
        if (headerElement) headerElement.innerText = page.header;
      }

      for (let i = 1; i <= 3; i++) {
        let textElement = groupElement.querySelector(`[id='${page.type}_text_${i}']`);
        if (textElement) {
          if (page.type === 'events') {
            if (i === 1) {
              textElement.innerText = page.title;
            } else if (i === 2) {
              textElement.innerText = page.text1;
            }
          } else {
            textElement.innerText = page[`text${i}`];
          }
        }
      }

      if (page.type === 'events') {
        for (let i = 1; i <= 3; i++) {
          let timeElement = groupElement.querySelector(`[id='${page.type}_text_${2 + i}']`);
          if (timeElement && page[`time${i}`]) timeElement.textContent = page[`time${i}`];
        }
      }
    }
  });
}

// Animate In Helper
function animateIn() {
  const decoration = document.getElementById('ticker_decoration');
  const main = document.getElementById('ticker_main');
  const audioIn = document.getElementById('audioIn');
  audioIn.play();
  decoration.style.animation = 'decoration-slide-down 1s ease-in forwards';
  main.style.animation = 'reveal 1s ease-in forwards 1s';
  // Set a delay before calling animateTimeText
  setTimeout(() => {
    animateTimeText();
  }, 2000);
}

// Animate Out Helper
function animateOut() {
  const decoration = document.getElementById('ticker_decoration');
  const main = document.getElementById('ticker_main');
  const audioOut = document.getElementById('audioOut');
  audioOut.play();
  main.style.animation = 'hide 1s ease-in forwards';

  // On Main Hide / Hide Decoration
  main.addEventListener('animationend', () => {
    decoration.style.animation = 'decoration-slide-up 1s ease-in forwards';
  }, { once: true });
}

// Animate Time Text Helper
function animateTimeText() {
  const timeTextParts = document.querySelectorAll('.time-text-part');
  let delay = 500; // Animation delay in milliseconds

  timeTextParts.forEach((part) => {
    part.style.opacity = '0';
    part.style.animationName = 'fade-in';
    part.style.animationDuration = '1s';
    part.style.animationTimingFunction = 'ease-in';
    part.style.animationFillMode = 'forwards';
    part.style.animationDelay = `${delay}ms`;
    delay += 200;
  });
}

// Show / hide groups
let groups = [];
let currentGroup = 0;
const currentInfoIndexReplicantTicker = nodecg.Replicant('currentInfoIndexReplicantTicker');

function switchGroup() {
  groups[currentGroup].style.display = 'none';
  currentGroup = (currentGroup + 1) % groups.length;
  currentInfoIndexReplicantTicker.value = currentGroup;
  groups[currentGroup].style.display = 'block';
}

// netCBCRep.on('change', (newValue) => {
//     netCBCRep.value = newValue;
//     console.log("CBC change", netCBCRep.value)
// });	

// nodecg.listenFor('playTicker', () => {
//     if (netCBCRep.value == "true") {
//         // Play Audio In
//         var audio = document.getElementById("audioIn");
//         audio.play();
//         // Animate In
//         console.log('playTicker');
//     } else {
//         console.log("CBC", netCBCRep.value);
//     }});

// nodecg.listenFor('stopTicker', () => {
//     if (netCBCRep.value == "true") {
//         // Play Audio Out
//         var audio = document.getElementById("audioOut");
//         audio.play();
//         // Animate Out
//         console.log("stopTicker");
//     } else {
//         console.log("CBC", netCBCRep.value);
//     }
// });