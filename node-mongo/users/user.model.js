const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const myProjects = require('../newproject/newProject.model');

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    myProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);