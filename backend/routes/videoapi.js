const express = require('express');
const videoApi = express.Router()



// Controllers file import

let getyoutubeVideo = require('../controllers/videoController')


videoApi.get('/videos',getyoutubeVideo.getYouTubeVideo)
videoApi.get('/videodetail/:id',getyoutubeVideo.getVideoData);
videoApi.post('/updateVideoInfo/:id',getyoutubeVideo.saveVideoInfo);

module.exports =   videoApi 