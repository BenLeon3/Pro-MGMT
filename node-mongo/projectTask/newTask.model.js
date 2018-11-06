const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const newTaskSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    projectTask: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    project: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

newTaskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ProjectTask', newTaskSchema);