module.exports = function (nodecg) {
    const fs = require('fs');
    const path = require('path');

    // Directories for pictos and athletes
    const pictosDir = path.join(__dirname, '../shared/assets/pictos');
    const athletesDir = path.join(__dirname, '../shared/assets/athletes');

    // Emit image list from a given directory
    function emitImageList(directory, topic) {
        fs.readdir(directory, (err, files) => {
            if (err) {
                console.error('Error reading image directory:', err);
                return;
            }

            const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
            nodecg.sendMessage(topic, imageFiles);
        });
    }

    // Watch directories for changes and emit updates
    function watchDirectory(directory, topic) {
        fs.watch(directory, (eventType, filename) => {
            console.log(`[${topic}] Event type: ${eventType}. File changed: ${filename}`);
            emitImageList(directory, topic);
        });
    }

    // Listen for requests to update image lists
    nodecg.listenFor('requestPictoImages', (value, ack) => {
        emitImageList(pictosDir, 'updatePictoImages');  // Respond to picto image requests
    });
    nodecg.listenFor('requestAthleteImages', (value, ack) => {
        emitImageList(athletesDir, 'updateAthleteImages');  // Respond to athlete image requests
    });

    // Initialize watchers
    watchDirectory(pictosDir, 'updatePictoImages');
    watchDirectory(athletesDir, 'updateAthleteImages');
};
