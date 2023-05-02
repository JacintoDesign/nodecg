
// const headerReplicant = nodecg.Replicant('header');
// const titleReplicant = nodecg.Replicant('title');
// const messageReplicant = nodecg.Replicant('message');
// const lowerReplicant = nodecg.Replicant('lower');
// var netCBCRep = nodecg.Replicant('netCBC');		

// // Change will be called when the Replicant loads too, so we can use it to set the initial value.
// headerReplicant.on('change', (newValue) => {
//     nav_header.innerText = newValue;
// });
// // Change will be called when the Replicant loads too, so we can use it to set the initial value.
// titleReplicant.on('change', (newValue) => {
//     nav_title.innerText = newValue;
// });
// // Change will be called when the Replicant loads too, so we can use it to set the initial value.
// messageReplicant.on('change', (newValue) => {
//     nav_message.innerText = newValue;
// });
// // Change will be called when the Replicant loads too, so we can use it to set the initial value.
// lowerReplicant.on('change', (newValue) => {
//     nav_lower.innerText = newValue;
// });

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

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const decoration = document.getElementById('ticker_decoration');
  const main = document.getElementById('ticker_main');
  const timeTextParts = document.querySelectorAll('.time-text-part');
  const audioIn = document.getElementById('audioIn');
  const audioOut = document.getElementById('audioOut');
  const animateOutBtn = document.getElementById('animate-out-btn');
  const animateInBtn = document.getElementById('animate-in-btn');
  const updateTextBtn = document.getElementById('update-text-btn');

  // Groups Elements
  groups = [
    document.getElementById('results-group'),
    document.getElementById('events-group'),
    document.getElementById('breaking-group'),
  ];

  // Animate Out ---------
  animateOutBtn.addEventListener('click', () => {
    audioOut.play();
    main.style.animation = 'hide 1s ease-in forwards';

    // Reset Time
    timeTextParts.forEach((part) => { 
      part.style.opacity = '0'; 
      part.style.animationName = ''; 
      part.style.animationDuration = ''; 
      part.style.animationTimingFunction = ''; 
      part.style.animationFillMode = ''; 
      part.style.animationDelay = ''; 
    }); 

    // On Main Hide / Hide Decoration
    main.addEventListener('animationend', () => {
      decoration.style.animation = 'decoration-slide-up 1s ease-in forwards';
    }, { once: true });
  });

  // Animate In ---------
  animateInBtn.addEventListener('click', () => {
    audioIn.play();
    decoration.style.animation = 'decoration-slide-down 1s ease-in forwards';
    main.style.animation = 'reveal 1s ease-in forwards 1s';
    // Set a delay before calling animateTimeText
    setTimeout(() => {
      animateTimeText();
    }, 2000);
  });

  // Update Group ---------
  updateTextBtn.addEventListener('click', () => {
    switchGroup();
  });

});

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

function switchGroup() {
  groups[currentGroup].style.display = 'none';
  currentGroup = (currentGroup + 1) % groups.length;
  groups[currentGroup].style.display = 'block';
}

// Initial Time Text Animation
setTimeout(() => {
  animateTimeText();
}, 2000);
