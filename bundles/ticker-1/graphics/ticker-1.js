		// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
		// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
		//const netCBC = 
		//console.log(netCBC);
		const headerReplicant = nodecg.Replicant('header');
		const titleReplicant = nodecg.Replicant('title');
		const messageReplicant = nodecg.Replicant('message');
		const lowerReplicant = nodecg.Replicant('lower');
		var netCBCRep = nodecg.Replicant('netCBC');
		//console.log(netCBCRep);
		

			// Change will be called when the Replicant loads too, so we can use it to set the initial value.
			headerReplicant.on('change', (newValue) => {
			nav_header.innerText = newValue;
		});
			// Change will be called when the Replicant loads too, so we can use it to set the initial value.
			titleReplicant.on('change', (newValue) => {
			nav_title.innerText = newValue;
		});
			// Change will be called when the Replicant loads too, so we can use it to set the initial value.
			messageReplicant.on('change', (newValue) => {
			nav_message.innerText = newValue;
		});
			// Change will be called when the Replicant loads too, so we can use it to set the initial value.
			lowerReplicant.on('change', (newValue) => {
			nav_lower.innerText = newValue;
		});

		netCBCRep.on('change', (newValue) => {
			netCBCRep.value = newValue;
			console.log("CBC change", netCBCRep.value)
		});	

		nodecg.listenFor('playTicker', () => {
			if (netCBCRep.value == "true") {
                // Play Audio In
				var audio = document.getElementById("audioIn");
  				audio.play();
                // Animate In
				console.log('playTicker');
			} else {
				console.log("CBC", netCBCRep.value);
			}});

		nodecg.listenFor('stopTicker', () => {
			if (netCBCRep.value == "true") {
                // Play Audio Out
				var audio = document.getElementById("audioOut");
				audio.play();
                // Animate Out
				console.log("stopTicker");
			} else {
				console.log("CBC", netCBCRep.value);
			}
		});