	
	const headerInput = document.querySelector('#headerInput');
	const titleInput = document.querySelector('#titleInput');
	const messageInput = document.querySelector('#messageInput');
	const lowerInput = document.querySelector('#lowerInput');
	
	const buttonSubmit = document.querySelector('.button.buttonSubmit');
	const buttonPlay = document.querySelector('.button.buttonPlay');
	const buttonClear = document.querySelector('.button.buttonClear');

	const headerReplicant = nodecg.Replicant('header');
	const titleReplicant = nodecg.Replicant('title');
	const messageReplicant = nodecg.Replicant('message');
	const lowerReplicant = nodecg.Replicant('lower');

	const netCBCRep = nodecg.Replicant('netCBC');
	const netTSNRep = nodecg.Replicant('netTSN');
	const netRSNRep = nodecg.Replicant('netRSN');

	headerReplicant.on('change', (newValue, oldValue) => {
		// The value of the Replicant has changed somewhere in NodeCG,
		// this could be another dashboard panel, a server initiated change,
		// or the doing of another user accessing your dashboard panel.
		headerInput.value = newValue;
	});   
	titleReplicant.on('change', (newValue, oldValue) => {
		titleInput.value = newValue;
	});
	messageReplicant.on('change', (newValue, oldValue) => {
		messageInput.value = newValue;
	});
	lowerReplicant.on('change', (newValue, oldValue) => {
		lowerInput.value = newValue;
	});
	netCBCRep.on('change', (newValue, oldValue) => {
		netCBC.value = newValue;
	});
	netTSNRep.on('change', (newValue, oldValue) => {
		netTSN.value = newValue;
	});
	netRSNRep.on('change', (newValue, oldValue) => {
		netRSN.value = newValue;
	});

	buttonSubmit.onclick = () => {
		// A Replicant can be modified by modifying its `value`.
		titleReplicant.value = titleInput.value;
		headerReplicant.value = headerInput.value;
		messageReplicant.value = messageInput.value;
		lowerReplicant.value = lowerInput.value;
		netCheck();
	};

	buttonPlay.onclick = () => {
		nodecg.sendMessage('playTicker');
	};

	buttonClear.onclick = () => {
		nodecg.sendMessage('stopTicker');
};

function netCheck() {
  // Get the checkbox
  var CBCcheck = document.getElementById("netCBC");
  var TSNcheck = document.getElementById("netTSN");
  var RSNcheck = document.getElementById("netRSN");

  if (CBCcheck.checked == true){
    netCBCRep.value = "true";
  } else {
    netCBCRep.value = "false";
  }
  
  if (TSNcheck.checked == true){
    netTSNRep.value = "true";
  } else {
    netTSNRep.value = "false";
  }
  
  if (RSNcheck.checked == true){
    netRSNRep.value = "true";
  } else {
    netRSNRep.value = "false";
  }

  
  console.log("CBC", netCBCRep.value); 
  console.log("TSN", netTSNRep.value);
  console.log("RSN", netRSNRep.value);
}