const mongoose = require('mongoose');
const { idText } = require('typescript');

// User Schema
const VideoSchema = mongoose.Schema({
  _id: {type:String},
  videotitle : {type: String, required: true},
  description: { type: String, required: true },
  videoURL: { type: String, required: true },
  videothumbnail: [],
  videoViewCount: { type: Number, require: true },
  likes: { type: String, require: true },
  dislikes: { type: String, require: true },
  channelTitle: { type: String, require: true },
  channelDescription: { type: String, require: true },
  channelThumbnail:{ type: String, require: true },
  channelSubscriber:{ type: String, require: true },
  embededUrl:{ type: String, require: true },
  updated: { type: Date },
  created: { type: Date, default: Date.now },
});
VideoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false
});

module.exports = mongoose.model('videoData', VideoSchema);
