# node-image-downloader

Small nodejs tool to download photos from vk.com. Has 2 ways to download:

    Old-fashioned way by parsing url and get images from it aka hardcore
    API-based way, usually more stable and reliable

Please note, that this tool was designed and developed in order to solve a specific problem.
I didn't have time to make it fancy and great.
It was "designed and developed on my left knee".
##### Last, but most important thing - all specified albums you want to download images from has to be public. As well as you profile should be public. Otherwise it will not work

### Initial setup
Project has fairly simple structure. First of all, please review package.json
and install dependencies by running `npm install`.
In order to make tool work you have to fill up few options in the config file. Some of the has default values which may be left as it is.
Here is the list of options with description:

    [useAPI]: true or false - a switch between two ways of running the tool (api and hardcode)
    [datafile]: relative path to data file with albums (used for the hardcode way)
    [basepath]: relative path to the main folder where photos will be saved
    [userId]: id of your user from vk
    [albums]: array of album ids, examples service albums - 'wall', 'profile',
    [photosPerRequest]: amount of photos to be requested per call

### Running
For running simply run `npm start` and go get a cup of tea.
It may take a while to download all the photos.

### Contribute & Feedback
The project is really simple one and there are always something that may be improved.
Do not hesitate and make a pull request. Otherwise just use it and be calm.
