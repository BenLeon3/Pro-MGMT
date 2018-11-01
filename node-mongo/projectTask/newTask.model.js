const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newTaskSchema = new Schema({
    projectTask: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

newTaskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ProjectTask', newTaskSchema);