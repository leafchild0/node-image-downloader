/**
 * Created: leafchild
 * Date: 5/17/2017
 * Project: node-image-downloader
 */

//Data about files
//Any other settings
  module.exports = {
      useAPI: true,
      datafile: 'datalinks.txt',
      basepath: 'photos',
      userId: 'Your user id',
      albums: ['profile', 'wall', /*Add/Remove your albums id's here divided by comma*/],
      photosPerRequest: 800
  };