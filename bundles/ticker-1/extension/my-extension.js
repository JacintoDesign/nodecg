module.exports = function (nodecg) {
    const fs = require('fs');
    const path = require('path');

    // Directories for pictos and athletes
    const sponsorDir = path.join(__dirname, '../shared/assets/sponsor');
    console.log("Sponsor Directory:", sponsorDir);

    // Emit image list from a given directory
    function emitImageList(directory, topic) {
        fs.stat(directory, (err, stats) => {
            if (err) {
                console.error("Error accessing directory:", directory, err);
                return;
            }
            if (!stats.isDirectory()) {
                console.error("Not a directory:", directory);
                return;
            }
            fs.readdir(directory, (err, files) => {
                if (err) {
                    console.error('Error reading image directory:', directory, err);
                    return;
                }
                const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
                nodecg.sendMessage(topic, imageFiles);
            });
        });
    }

    // Watch directories for changes and emit updates
    function watchDirectory(directory, topic) {
        fs.watch(directory, (eventType, filename) => {
            console.log(`[${topic}] Event type: ${eventType}. File changed: ${filename}`);
            emitImageList(directory, topic);
        });
    }

    // Listen for requests to update image list
    nodecg.listenFor('requestSponsorImages', (value, ack) => {
        emitImageList(sponsorDir, 'updateSponsorImages');  // Respond to sponsor image requests
    });


    // Initialize watchers
    watchDirectory(sponsorDir, 'updateSponsorImages');
};
