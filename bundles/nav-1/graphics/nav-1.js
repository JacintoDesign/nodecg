document.addEventListener('DOMContentLoaded', () => {
  let currentInfoIndex = 0;
  // Channel Info
  loadChannelInfos();

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
    const nextInfo = channelInfos[currentInfoIndex];
    updateText('header_text', nextInfo.header);
    updateText('title_text', nextInfo.title);
    updateText('nav_time', nextInfo.time1, nextInfo.time2, nextInfo.time3); // Pass the new time properties
    updateText('nav_footer_text', nextInfo.day);

    currentInfoIndex = (currentInfoIndex + 1) % channelInfos.length;
    console.log('next');
  });

  // Submit
  nodecg.listenFor('update', () => {
    console.log('update');
  });

});

// Animate In Helper
function animateIn() {
  const decoration = document.getElementById('nav_decoration');
  const main = document.getElementById('nav_main');
  const footer = document.getElementById('nav_footer');
  const triangle = document.getElementById('triangle');
  const triangleImg = triangle.querySelector('img');
  const audioIn = document.getElementById('audioIn');
  const headerText = document.getElementById('header_text');
  const titleText = document.getElementById('title_text');
  const time1 = document.getElementById('time-1');
  const time2 = document.getElementById('time-2');
  const time3 = document.getElementById('time-3');

  headerText.style.animation = 'text-slide-in .5s ease-in forwards 1s';
  titleText.style.animation = 'text-slide-in 1s ease-in forwards .5s';
  time1.style.animation = 'time-text-slide-in .5s ease-in forwards';
  time2.style.animation = 'time-text-slide-in .5s ease-in forwards .15s';
  time3.style.animation = 'time-text-slide-in .5s ease-in forwards .3s';

  audioIn.play();
  decoration.style.animation = 'decoration-slide-in .5s ease-in forwards';
  footer.style.animation = 'reveal-footer .5s ease-in forwards .5s';
  triangleImg.style.animation = 'fade-in-diagonal 1s ease-in forwards .5s, diagonal-animation-1 2s linear 1s forwards';
  main.style.animation = 'reveal .5s ease-in forwards .5s';
  // Set a delay before calling animateTimeText
  setTimeout(() => {
    animateTimeText();
  }, 500);
}

// Animate Out Helper
function animateOut() {
  const decoration = document.getElementById('nav_decoration');
  const main = document.getElementById('nav_main');
  const footer = document.getElementById('nav_footer');
  const triangle = document.getElementById('triangle');
  const triangleImg = triangle.querySelector('img');
  const audioOut = document.getElementById('audioOut');
  audioOut.play();
  main.style.animation = 'hide .5s ease-in forwards';
  footer.style.animation = 'hide-footer .5s ease-in forwards';
  triangleImg.style.animation = 'diagonal-animation-2 .75s ease-in forwards';
  const timeTextParts = document.querySelectorAll('.time-text-part');

  // Fade Out Time
  timeTextParts.forEach((part) => {
    part.style.animation = 'fade-out .5s ease-in forwards';
  });

  // Fade Out Decoration
  main.addEventListener('animationend', () => {
    decoration.style.animation = 'decoration-slide-out 1s ease-in forwards';
  }, { once: true });
}

// Animate Time Text Helper
function animateTimeText() {
  let delay = 100; // Animation delay in milliseconds

  for (let i = 1; i <= 3; i++) {
    const part = document.getElementById(`time-${i}`);
    part.style.animation = `fade-in 1s ease-in forwards ${delay}ms`;
    delay += 200;
  }
}

// Update Text Helper
function updateText(id, ...args) { // Update the function definition to accept rest parameters
  // Animate Out Previous
  const element = document.getElementById(id);
  element.style.animation = 'text-slide-out .5s ease-in forwards';

  element.addEventListener('animationend', () => {
    // If Not Time, Animate In
    if (id !== "nav_time") {
      element.textContent = args[0]; // Update the text content using the first argument
      element.style.animation = 'text-slide-in .5s ease-out forwards';
    } else {
      // Set Text for Time
      document.getElementById('time-1').textContent = args[0]; // time1
      document.getElementById('time-2').textContent = args[1]; // time2
      document.getElementById('time-3').textContent = args[2]; // time3

      element.style.animation = ''; // Reset animation for nav_time element

      // Reset Time Elements
      for (let i = 1; i <= 3; i++) {
        const part = document.getElementById(`time-${i}`);
        part.style.animation = ''; // Reset animation
        part.style.opacity = '0'; // Reset opacity
      }

      // Animate In Time Elements
      setTimeout(() => {
        for (let i = 1; i <= 3; i++) {
          const part = document.getElementById(`time-${i}`);
          part.style.animation = `time-text-slide-in .5s ease-in forwards ${i * 200}ms`;
        }
      }, 50);
    }
  }, { once: true });
}

let channelInfos = [
  { header: 'CBC', title: 'Alpine Skiing', time1: '11:30', time2: 'AM', time3: 'ET', day: 'Today' },
  { header: 'TSN', title: 'Freestyle Halfpipe', time1: '8:00', time2: 'AM', time3: 'ET', day: 'Today' },
  { header: 'SN', title: 'Ski Jumping', time1: '3:00', time2: 'PM', time3: 'ET', day: 'Tuesday' },
  { header: 'TSN2', title: 'Biathalon', time1: '1:30', time2: 'PM', time3: 'ET', day: 'Friday' },
  { header: 'SN1', title: 'Nordic Combined', time1: '11:00', time2: 'PM', time3: 'ET', day: 'Tonight' }
];

// Function to load channelInfos from localStorage
function loadChannelInfos() {
  const savedChannelInfos = localStorage.getItem('channelInfos');
  if (savedChannelInfos) {
    channelInfos = JSON.parse(savedChannelInfos);
  }
}