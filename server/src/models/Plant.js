const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const plantSchema = new Schema({
    created_on: Number,
    ended_on: Number,
    location: String,
    logs: [ObjectId],
    method: String,
    name: String,
    note: String,
    propagation: String,
    source: String,
    stage: String,
    started_on: Number,
    type: String,
}, { versionKey: false });

module.exports = mongoose.model('Plant', plantSchema);