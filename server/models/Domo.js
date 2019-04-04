const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

//mogoose.types.objectid is a function that converst string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();
const setUserName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },

    username: {
        type: String,
        required: true,
        set: setUserName,
    },

    password:{
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

DomoSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    username: doc.username,
    password: doc.password,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return DomoModel.find(search).select('title username password').exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;