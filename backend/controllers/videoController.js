let VideoSchema = require('../models/videoModel');
const puppeteer = require("puppeteer");
const getVideoId = require('get-video-id');
const videiInfo = require('updated-youtube-info');
const { v4: uuidv4 } = require('uuid');


const saveVideoDataInDb = async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.youtube.com/feed/trending', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'example.png' });
    let anchortag = await page.evaluate(() => {
      let data = [...document.querySelectorAll('a[id ="video-title"]')]
      return data.map((data) => data.href);
    });

    anchortag.forEach(async (value) => {
      try{
        let { id } = await getVideoId(`${value}`);
      let videoDetails = await videiInfo(`${id}`);
      if (videoDetails) {
        let thumnailArray = [`https://img.youtube.com/vi/${id}/sddefault.jpg`, `https://img.youtube.com/vi/${id}/hqdefault.jpg`, `https://img.youtube.com/vi/${id}/1.jpg`, `https://img.youtube.com/vi/${id}/2.jpg`, `https://img.youtube.com/vi/${id}/3.jpg`];
        videoDetails.thumbnailUrl = { thumbnail: thumnailArray }
        var saveData = {
          _id: uuidv4(), 
          videotitle: videoDetails.title,
          description: videoDetails.description,
          videoURL: videoDetails.url,
          videothumbnail: videoDetails.thumbnailUrl,
          videoViewCount: videoDetails.views,
          likes: videoDetails.likeCount,
          dislikes: videoDetails.dislikeCount,
          channelTitle: videoDetails.owner,
          channelDescription: videoDetails.description,
          channelThumbnail: videoDetails.channelThumbnailUrl,
          channelSubscriber: videoDetails.channelId,
          embededUrl: `https://www.youtube.com/embed/${id}`,
          updated: Date.now()
        }
        let countofCollection = await VideoSchema.count({}).exec();
        if (countofCollection == 0) {
          let savingData = new VideoSchema(saveData); 
          await savingData.save();
        } else if (countofCollection != anchortag.length) {
          VideoSchema.exists({ videoURL: `${value}` }, async (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result === false) {
                let savingData = new VideoSchema(saveData);
                await savingData.save();
              }
            }
          })
        }
      }
      }catch(error){console.log(error)}
      
    })
  } catch (error) {
    console.log("Error logs" + error)
  }



};


const getYouTubeVideo = async (req, res) => {
  const data = await VideoSchema.find({}).exec();
  if (data) {
    res.status(200).json({ result: [...data], status: true })
  } else {
    res.status(400).send("There is some issue to read the data");

  }

};

const getVideoData = async (req, res) => {
  let videoUrl = req.params.id;
  console.log("Vide url" + videoUrl);
  const data = await VideoSchema.findOne({_id:`${videoUrl}`}).exec();
  if (data) {
    res.status(200).json({ result: [data], status: true })
  } else {
    res.status(400).send("There is some issue to read the data");
  }
};

const saveVideoInfo = async (req, res) => {
  let videoUrl = req.params.id;
  console.log("Vide url" + videoUrl);
  let doc = await VideoSchema.findOneAndUpdate({_id:`${videoUrl}`}, {updated:Date.now()}, {
    new: true
  });  
  if(doc){
    res.status(200).json({ result: "Data us saved Successfully", status: true })
  }
}


module.exports = { getYouTubeVideo, getVideoData, saveVideoDataInDb, saveVideoInfo }