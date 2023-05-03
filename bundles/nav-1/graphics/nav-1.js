document.addEventListener('DOMContentLoaded', () => {
  // Channel Info
  const channelInfos = [
    { header: 'TSN', title: 'Freestyle Halfpipe', time: '8:00 AM ET', day: 'Today' },
    { header: 'SN', title: 'Ski Jumping', time: '3:00 PM ET', day: 'Tuesday' },
    { header: 'TSN2', title: 'Biathalon', time: '1:30 PM ET', day: 'Friday' },
    { header: 'SN1', title: 'Nordic Combined', time: '11:00 PM ET', day: 'Tonight' }
  ];
  let currentInfoIndex = 0;

  // NodeCG Related -------------------
  const headerReplicant = nodecg.Replicant('header');
  const titleReplicant = nodecg.Replicant('title');
  const headerText = document.getElementById('header_text');
  const titleText = document.getElementById('title_text');

  // Change will be called when the Replicant loads too, so we can use it to set the initial value.
  headerReplicant.on('change', (newValue) => {
    if (newValue && headerText) headerText.textContent = newValue;
  });
  // Change will be called when the Replicant loads too, so we can use it to set the initial value.
  titleReplicant.on('change', (newValue) => {
    if (newValue && titleText) titleText.textContent = newValue;
  });

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
    updateText('nav_time', nextInfo.time);
    updateText('nav_footer_text', nextInfo.day);
  
    currentInfoIndex = (currentInfoIndex + 1) % channelInfos.length;
    console.log('next');
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
function updateText(id, text) {
  // Animate Out Previous
  const element = document.getElementById(id);
  element.style.animation = 'text-slide-out .5s ease-in forwards';
  
  element.addEventListener('animationend', () => {
    // If Not Time, Animate In
    if (id !== "nav_time") {
      element.textContent = text;
      element.style.animation = 'text-slide-in .5s ease-out forwards';
    } else {
      // Set Text for Time
      const [time, amPm, timeZone] = text.split(' ');
      document.getElementById('time-1').textContent = time;
      document.getElementById('time-2').textContent = amPm;
      document.getElementById('time-3').textContent = timeZone;

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
