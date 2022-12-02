const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const logSchema = new Schema({
    created_on: Number,
    day: String,
    images: [String],
    note: String,
    plant_id: ObjectId,
    stage: String,
    type: String
}, { versionKey: false });

module.exports = mongoose.model('Log', logSchema);