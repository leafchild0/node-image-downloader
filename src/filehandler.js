/**
 * Created: leafchild
 * Date: 5/17/2017
 * Project: node-image-downloader
 */

const config = require('./config');
const fs = require('fs');
const request = require('request');
const basePath = config.basepath;

/**
 * Parse file
 */
function processDataConfig(error, success) {

    const filepath = config.datafile;

    if(filepath == undefined) {
        error("Data file datalinks.txt is missing. Create and fill this file or specify own one");
    }

    let mapping = fs.readFile(filepath, 'utf-8', function read(err, data) {
        if (err) {
            throw err;
        }
        mapping = data.replace('\r', '');

        if(mapping != undefined) {
            mapping = cleanUpAndSortData(mapping);
            success(mapping);
        }
    });

}

/**
 * Saves image in the filesystem
 * @param request - request with the image
 * @param path - filepath to save
 * @param callback - callback function
 */
function saveImage(request, path, callback) {
    request.pipe(fs.createWriteStream(basePath + '/' + path))
        .on('close', callback.success)
        .on('error', callback.error);
}

/**
 * Creates album in the filesystem
 * @param albumName - name of the album
 */
function createAlbum(albumName) {
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
    }
    if (!fs.existsSync(basePath + '/' + albumName)) {
        fs.mkdirSync(basePath + '/' + albumName);
    }
}

/**
 * Cleans up albums urls
 * @param mapping - file mapping
 * @returns {Array} - sorted and only http/https links
 */
function cleanUpAndSortData(mapping) {

    let lines = mapping.split('\n');
    let sorted = [];
    let i = 0;

    lines.forEach(line => {
        if(line.startsWith('http')) sorted[i++] = line;
    });

    return sorted;
}

module.exports = {
    collectData: processDataConfig,
    createAlbum: createAlbum,
    saveImage: saveImage
};