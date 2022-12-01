const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const plantSchema = new Schema({
    created_on: Number,
    name: String,
    source: String,
    type: String,
    propagation: String,
    location: String,
    method: String,
    started_on: Number,
    ended_on: Number,
    note: String,
    logs: [ObjectId]
}, { versionKey: false });

module.exports = mongoose.model('Plant', plantSchema);