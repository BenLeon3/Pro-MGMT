const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectTaskSchema = new Schema({
    projectTask: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

projectTaskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ProjectTask', projectTaskSchema);