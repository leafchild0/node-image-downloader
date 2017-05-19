/**
 * Created: leafchild
 * Date: 5/19/2017
 * Project: node-image-downloader
 */
const request = require('request');
const config = require('./config');
const fileHandler = require('./filehandler');

/**
 * Main function which will call api and get list of photos
 * @param albumId
 * @param callback
 */
function downLoadImagesByAlbum(albumId, callback) {

    let apiUrl = getAPIUrl(albumId);
    if(apiUrl != '') {
        request.get(apiUrl, function(err, res, body) {
            let data = JSON.parse(body);
            if (data.error) {
                console.error('Something wrong accessing album ' + albumId, data.error);
                callback(false);
            }
            else {
                let photosArr = data.response.items;
                let imagesSaved = 0;

                photosArr.forEach(item => {
                    let biggerPhoto = item.sizes[item.sizes.length - 1];
                    if (biggerPhoto != undefined) {
                        fileHandler.createAlbum(albumId);

                        let fileName = biggerPhoto.src.match(/([^/]+$)/)[0];
                        let filePath = albumId + '/' + fileName;
                        fileHandler.saveImage(request(biggerPhoto.src), filePath,
                            {
                                error: function(error) {
                                    console.error("Error downloading image: " + error);
                                    callback(false);
                                }, success: function() {
                                console.log('Image ' + fileName + ' was saved');
                                imagesSaved++;
                                if (imagesSaved == photosArr.length) {
                                    callback(true);
                                }
                            }
                            });
                    }
                });
            }

        }).on('error', function(e) {
            console.error('Something wrong accessing album ' + albumId, e);
            callback(false);
        });
    }
}

/**
 * Collects url to call using parameters from config
 * @param albumId
 * @returns {string} api string
 */
function getAPIUrl(albumId) {

    let photosPerRequest = config.photosPerRequest || 100;
    let userId = config.userId;
    if (userId == undefined) {
        console.error('User id is not defined');
        return '';
    }

    return 'https://api.vk.com/method/photos.get?owner_id='
        + userId + '&v=5.52&album_id=' + albumId + '&count='
        + photosPerRequest + '&photo_sizes=z';
}

module.exports = {
    downLoadImagesByAlbum: downLoadImagesByAlbum
};