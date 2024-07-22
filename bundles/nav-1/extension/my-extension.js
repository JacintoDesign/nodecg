module.exports = function (nodecg) {
    const fs = require('fs');
    const path = require('path');

    // Directories for pictos and athletes
    const pictosDir = path.join(__dirname, '../shared/assets/pictos');
    const athletesDir = path.join(__dirname, '../shared/assets/athletes');
    console.log("Pictos Directory:", pictosDir);
    console.log("Athletes Directory:", athletesDir);

    // Emit image list from a given directory
    function emitImageList(directory, topic) {
        fs.readdir(directory, { withFileTypes: true }, (err, dirents) => {
            if (err) {
                console.error('Error reading image directory:', directory, err);
                return;
            }
    
            // dirents.forEach(dirent => {
            //     console.log(`${dirent.name}: ${dirent.isFile() ? 'File' : 'Directory'}`);
            // });
    
            const imageFiles = dirents
                .filter(dirent => dirent.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(dirent.name))
                .map(dirent => dirent.name);
    
            console.log(`Emitting ${imageFiles.length} images for ${topic} from ${directory}`);
            nodecg.sendMessage(topic, imageFiles);
        });
    }
    

    // Watch directories for changes and emit updates
    function watchDirectory(directory, topic) {
        fs.watch(directory, (eventType, filename) => {
            if (filename) {
                console.log(`[${topic}] Event type: ${eventType}. File changed: ${filename}`);
                emitImageList(directory, topic);
            } else {
                console.log(`[${topic}] Event type: ${eventType}. No specific file changed.`);
            }
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
