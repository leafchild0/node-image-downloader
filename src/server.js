/**
 * Created: leafchild
 * Date: 5/17/2017
 * Project: node-image-downloader
 */

const fileHandler = require('./filehandler');
const downloader = require('./downloader');
const api = require('./apirequest');
const config = require('./config');

/**
 * Main app function
 * I was about to name it doWork()
 * Will get initial data from config and download damn photos
 */
function startDownload() {

    //Prefer to use API way
    if (config.useAPI) {
        let albums = config.albums;
        let overAllCount = 0;

        albums.forEach(album => {
            api.downLoadImagesByAlbum(album, function(result) {
                if (result) {
                    console.log('Album ' + albums[0] + ' was saved');
                }

                overAllCount++;
                if (albums.length == overAllCount) {
                    process.exit(0);
                }
            });
        });

    }
    //Old way of doing things if you like hardcore stuff
    else {

        fileHandler.collectData(function error(message) {
            console.error(message);
        }, function success(data) {
            if (data != undefined) {
                let overAllCount = 0;
                let dataAmount = data.length;
                data.forEach(album => {
                    downloader.downloadImages(album, function(albumName) {
                        console.log('Images were saved in album ' + albumName);
                        overAllCount++;

                        if (dataAmount == overAllCount) {
                            process.exit(0);
                        }
                    });
                });
            }
            else {
                console.error('Something went wrong with getting list of albums');
                process.exit(1);
            }
        });
    }
}

//Actual call of that function
startDownload();


