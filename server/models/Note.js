const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let NoteModel = {};

// mogoose.types.objectid is a function that converst string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const NoteSchema = new mongoose.Schema({
  notetitle: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  content: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

NoteSchema.statics.toAPI = (doc) => ({
  notetitle: doc.notetitle,
  content: doc.content,
});

NoteSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return NoteModel.find(search).select('notetitle content').exec(callback);
};

NoteModel = mongoose.model('Note', NoteSchema);

module.exports.NoteModel = NoteModel;
module.exports.NoteSchema = NoteSchema;
