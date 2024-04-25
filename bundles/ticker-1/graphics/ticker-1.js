document.addEventListener('DOMContentLoaded', () => {
  let groupItems = [
    { type: 'Results', message: '100 Meter World Record Holder' },
    { type: 'Results', message: '200 Meter World Record Holder' },
    { type: 'Breaking', message: 'New Marathon Record' },
    { type: 'Breaking', message: 'Canadian swimmers set World Record' },
    { type: 'Promo', message: 'Upcoming: World Championship' },
    { type: 'Free', message: 'Tension as Olympics approach' },
  ];

  let currentGroupIndex = 0;
  let refreshInterval = 5000;
  let transitionTimeoutId;

  // Create Group HTML
  function createGroup(item, index) {
    const group = document.createElement('div');
    group.classList.add('group', `${item.type.toLowerCase()}-group`);
    group.id = `group-${index}`;

    // Create Header
    if (item.type !== 'Free') {
      const headerText = document.createElement('div');
      headerText.classList.add('ticker-header-text', `${item.type.toLowerCase()}-header-text`);
      // Set the text content based on the group type
      if (item.type === 'Promo') {
        headerText.textContent = 'Coming Up';
      } else {
        headerText.textContent = item.type;
      }
      group.appendChild(headerText);
    }

    // Create Dot
    const dot = document.createElement('div');
    dot.classList.add('ticker-dot', `${item.type.toLowerCase()}-dot`);
    group.appendChild(dot);

    // Create Message
    const messageText = document.createElement('div');
    messageText.classList.add('ticker-message-text');
    messageText.textContent = item.message;
    group.appendChild(messageText);

    return group;
  }

  // Create and append HTML elements
  function initializeTicker() {
    const tickerMain = document.getElementById('ticker-main');
    tickerMain.innerHTML = '';
    groupItems.forEach((item, index) => {
      const groupElement = createGroup(item, index);
      // Set display to none for all but the first groupElement
      if (index !== 0) {
        groupElement.style.display = 'none';
      }
      tickerMain.appendChild(groupElement);
    });
  }

  // Animate In Helper
  function animateIn() {
    // Clear existing timeout
    if (transitionTimeoutId) {
      clearTimeout(transitionTimeoutId);
    }

    initializeTicker();
    const tickerMain = document.getElementById('ticker-main');
    const tickerBackground = document.getElementById('ticker-background');
    tickerMain.style.transform = "translateY(100%)";
    tickerBackground.style.transform = "translateY(100%)";
    tickerMain.style.animation = 'slide-up 0.75s ease-out forwards 0.3s';
    tickerBackground.style.animation = 'slide-up 0.75s ease-out forwards';
    // Reset Ticker main / background position
    setTimeout(() => {
      tickerMain.style.transform = "translateY(0)";
      tickerBackground.style.transform = "translateY(0)";
    }, 3000);
    // Reset currentGroup Index
    currentGroupIndex = 0;
    const currentGroup = document.getElementById(`group-${currentGroupIndex}`);
    if (currentGroup) {
      currentGroup.style.display = 'flex';
      currentGroup.classList.remove('animate-group-out');
      currentGroup.classList.add('animate-group-in');
    }
    // Set animations for every group
    const allGroups = document.querySelectorAll('.group');
    if (allGroups) {
      allGroups.forEach((group) => {
        const groupHeader = group.querySelector('.ticker-header-text');
        const groupDot = group.querySelector('.ticker-dot');
        const groupText = group.querySelector('.ticker-message-text');
        if (groupHeader) {
          groupHeader.style.animation = 'text-slide-up 0.5s ease-out forwards 0.4s';
        }
        if (groupDot) {
          groupDot.style.animation = 'blink-on 1s forwards .75s';
        }
        if (groupText) {
          groupText.style.animation = 'text-slide-right 0.3s ease-out forwards 0.5s';
        }
      });
    }
    transitionTimeoutId = setTimeout(transitionToNextGroup, refreshInterval);
  }

  // Animate Out
  function animateOut() {
    const tickerMain = document.getElementById('ticker-main');
    const tickerBackground = document.getElementById('ticker-background');
    tickerMain.style.animation = 'slide-down 0.75s ease-in forwards';
    tickerBackground.style.animation = 'slide-down 0.5s ease-out forwards 0.5s';
  }

  // Transition between groups
  function transitionToNextGroup() {
    // Clear existing timeout
    if (transitionTimeoutId) {
      clearTimeout(transitionTimeoutId);
    }

    const currentGroup = document.getElementById(`group-${currentGroupIndex}`);
    if (currentGroup) {
      // blink off animation for dot
      const currentGroupDot = currentGroup.querySelector('.ticker-dot');
      currentGroupDot.style.animation = 'blink-off 0.75s forwards';

      // on delay, animate group out
      currentGroup.classList.add('animate-group-out');
      setTimeout(() => {
        currentGroup.style.display = 'none';
        currentGroup.style.animation = '';
      }, 600);
    }

    // Increment the group index
    currentGroupIndex++;

    // Check if we've gone through all groups
    if (currentGroupIndex < groupItems.length) {
      const nextGroup = document.getElementById(`group-${currentGroupIndex}`);
      if (nextGroup) {
        setTimeout(() => {
          nextGroup.style.display = 'flex';
          nextGroup.classList.remove('animate-group-out');
          nextGroup.classList.add('animate-group-in');
        }, 200);
      }
      // Schedule the next transition
      transitionTimeoutId = setTimeout(transitionToNextGroup, refreshInterval);
    } else {
      // If we've displayed all groups, animate out ticker-main
      playAudioOut();
      const tickerMain = document.getElementById('ticker-main');
      const tickerBackground = document.getElementById('ticker-background');
      tickerMain.style.animation = 'slide-down 0.75s ease-in forwards';
      tickerBackground.style.animation = 'slide-down 0.5s ease-out forwards 0.5s';
    }
  }

  // NodeCG Related ------------------- 
  const netCBCRep = nodecg.Replicant('netCBC');
  const netTSNRep = nodecg.Replicant('netTSN');
  const netRSNRep = nodecg.Replicant('netRSN');
  const tickerItemsReplicant = nodecg.Replicant('tickerItems');
  const refreshIntervalReplicant = nodecg.Replicant('refreshInterval');
  const networkReplicants = { netCBCRep, netTSNRep, netRSNRep };

  // Handle Instance of Network
  function handleInstanceAction(instanceId, replicants, action, logMessage, audioAction) {
    const instanceActions = {
      'CBC': { replicant: replicants.netCBCRep, logPrefix: 'CBC' },
      'TSN': { replicant: replicants.netTSNRep, logPrefix: 'TSN' },
      'RSN': { replicant: replicants.netRSNRep, logPrefix: 'RSN' }
    };

    const currentInstance = instanceActions[instanceId];
    if (currentInstance && currentInstance.replicant.value === "true") {
      action();
      console.log(`${currentInstance.logPrefix} ${logMessage}`);
      if (audioAction) audioAction();
    }
  }

  // Update Ticker array
  tickerItemsReplicant.on('change', (newValue) => {
    if (newValue) {
      tickerItemsReplicant.value = newValue;
      groupItems = newValue;
      console.log("ticker Items", tickerItemsReplicant.value, groupItems);
      initializeTicker();
    }
  });

  // Update Refresh Interval
  refreshIntervalReplicant.on('change', (newValue) => {
    if (newValue) {
      handleInstanceAction(instanceId, networkReplicants, () => {
        refreshIntervalReplicant.value = newValue;
        refreshInterval = newValue * 1000;
      }, `refreshInterval ${newValue * 1000}`);
    }
  });

  // Animate In with audio
  nodecg.listenFor('play', () => {
    handleInstanceAction(instanceId, networkReplicants, animateIn, 'in', playAudioIn);
  });

  // Animate Out with audio
  nodecg.listenFor('stop', () => {
    handleInstanceAction(instanceId, networkReplicants, animateOut, 'out', playAudioOut);
  });

  // Animate Next without specific audio
  nodecg.listenFor('next', () => {
    handleInstanceAction(instanceId, networkReplicants, transitionToNextGroup, 'next');
  });

  // Play Audio In
  function playAudioIn() {
    const audio = document.getElementById("audioIn");
    if (audio) audio.play();
  }

  // Play Audio Out
  function playAudioOut() {
    const audio = document.getElementById("audioOut");
    if (audio) audio.play();
  }

  // Submit
  nodecg.listenFor('update', () => {
    console.log('groupItems update', groupItems);
  });

  // Get instance ID from URL
  function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  const instanceId = getParameterByName('instance');
  console.log('instanceId', instanceId);

  document.title = `Ticker - ${instanceId}`;
});