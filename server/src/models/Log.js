const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const logSchema = new Schema({
    created_on: Number,
    images: [String],
    note: String,
    plant_id: ObjectId,
    type: String
}, { versionKey: false });

module.exports = mongoose.model('Log', logSchema);