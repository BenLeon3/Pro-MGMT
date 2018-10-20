const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newProjectSchema = new Schema({
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    finishDate: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

newProjectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', newProjectSchema);