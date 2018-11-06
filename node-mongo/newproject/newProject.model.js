const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const myTasks = require('../projectTask/newTask.model');
// const creator = require('../users/user.model');

const newProjectSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    finishDate: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    projectTasks: [{ type: Schema.Types.ObjectId, ref: 'ProjectTask' }] 
});

newProjectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', newProjectSchema);