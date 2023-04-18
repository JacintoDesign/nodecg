
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

function updateText(textClass, newText) {
    const textElements = document.querySelectorAll(textClass);
  
    textElements.forEach((element) => {
      element.classList.add('text-fade-out');
  
      element.addEventListener('animationend', () => {
        element.textContent = newText;
        element.classList.remove('text-fade-out');
        element.classList.add('text-fade-in');
  
        element.addEventListener('animationend', () => {
          element.classList.remove('text-fade-in');
        }, { once: true });
      }, { once: true });
    });
  }
  

  document.addEventListener('DOMContentLoaded', () => {
    const animateOutBtn = document.getElementById('animate-out-btn');
    const animateInBtn = document.getElementById('animate-in-btn');
    const updateTextBtn = document.getElementById('update-text-btn');
  
    animateOutBtn.addEventListener('click', () => {
        const decoration = document.getElementById('ticker_decoration');
        const main = document.getElementById('ticker_main');
        main.style.animation = 'hide 1s ease-in forwards';
      
        main.addEventListener('animationend', () => {
          decoration.style.animation = 'decoration-slide-up 1s ease-in forwards';
        }, { once: true });
      });
      
  
    animateInBtn.addEventListener('click', () => {
      const decoration = document.getElementById('ticker_decoration');
      const main = document.getElementById('ticker_main');
      decoration.style.animation = 'decoration-slide-down 1s ease-in forwards';
      main.style.animation = 'reveal 1s ease-in forwards 1s';
    });
  
    updateTextBtn.addEventListener('click', () => {
      // Replace this with the actual new text you want to set
      const newText = 'New Content';
      updateText('.text', newText);
    });
  });
  
  