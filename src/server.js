/**
 * Created: leafchild
 * Date: 5/17/2017
 * Project: node-image-downloader
 */

const fileHandler = require('./filehandler');
const downloader = require('./downloader');

fileHandler.collectData(function error(message) {
    console.error(message);
}, function success(data) {
    if(data != undefined) {
        let overAllCount = 0;
        let dataAmount = data.length;
        data.forEach(album => {
            downloader.downloadImages(album, function(albumName) {
                console.log('Images were saved in album ' + albumName);
                overAllCount++;
                
                if(dataAmount == overAllCount) {
                    process.exit(0);
                }
            });
        });
    } else {
        console.error('Something went wrong with getting list of albums');
        process.exit(1);
    }
});


