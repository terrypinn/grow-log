const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const logSchema = new Schema({
    plant_id: ObjectId,
    created_on: Number,
    type: String,
    note: String,
    images: [String]
}, { versionKey: false });

module.exports = mongoose.model('Log', logSchema);