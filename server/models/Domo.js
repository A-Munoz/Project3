const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

//The need values of the each bubble
const bubbleSchema = new mongoose.Schema({
   radius: {
       type: Number,
       default: 60
   }, 
   increaseRate: {
       type: Number,
       default: 60
   },
   color: {
       type: String,
       default: '##ED5565'
   },
     currentSelected: {
       type: Boolean,
       default: false
   }, 
});

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    set: setName,
  },
  bubbles: { //A array of bubbles
    type: [bubbleSchema],
    default: undefined,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});


DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('name').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
