/**
 * Created: leafchild
 * Date: 5/17/2017
 * Project: node-image-downloader
 */

const request = require('request');
const cheerio = require('cheerio');
const fileHandler = require('./filehandler');

/**
 * Download images by album url
 * @param albumUrl
 * @param callback
 */
function downloadImages(albumUrl, callback) {

    let images = [];
    let albumName = '';
    let imagesInAlbum = 0;

    request(albumUrl, function(error, response, body) {
        if (!error) {
            let $ = cheerio.load(body);
            albumName = $('.sub_header').text();

            if(albumName != '') {
                let photos = $('.photos_page img');

                for (let j = 0; j < photos.length; j++) {
                    let tempSrc = photos[j].attribs['data-src_big'];
                    images[j] = tempSrc.match(/^.*[.jpg]/)[0];
                }
                download(albumName, images, function(result) {

                    if(result) imagesInAlbum++;
                    if(imagesInAlbum == images.length) {
                        callback(albumName);
                    }
                });

            } else {
                console.error('Album is private, please grant an access to ' + albumUrl);
            }
        }

    });//.on('end', callback(albumName));
}

/**
 * Download and save image
 */
function download(albumName, data, callback) {

    if(data != undefined) {
        fileHandler.createAlbum(albumName);

        data.forEach(url => {
            //Get filename
            let fileName = url.match(/([^/]+$)/)[0];
            let filePath = albumName + '/' + fileName;
            //Add a callback
            fileHandler.saveImage(request(url), filePath, { error: function (error) {
                console.error("Error downloading image: " + error);
                callback(false);
            }, success: function() {
                console.log('Image ' + fileName + ' was saved');
                callback(true);
            }});
        });
    }
    else {
        callback('');
    }
}

module.exports = {
    downloadImages: downloadImages
};