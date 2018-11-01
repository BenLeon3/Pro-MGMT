const config = require('config.json');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const ProjectTask = db.ProjectTask;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await ProjectTask.find().select();
}

async function getById(id) {
    return await ProjectTask.findById(id).select();
}

async function create(newTaskParam) {
    // validate
    if (await ProjectTask.findOne({ projectTask: newTaskParam.projectTask })) {
        throw 'Project task "' + newTaskParam.projectTask + '" is already taken';
    }

    const newTask = new ProjectTask(newTaskParam);

    // save user
    await newTask.save();
}

async function update(id, newTaskParam) {
    const newTask = await ProjectTask.findById(id);

    // validate
    if (!newTask) throw 'Project not found';
    if (newTask.projectTask !== newTaskParam.projectTask && await ProjectTask.findOne({ projectTask: newTaskParam.projectTask })) {
        throw 'Task name "' + newTaskParam.projectTask + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(newTask, newTaskParam);

    await newTask.save();
}

async function _delete(id) {
    await ProjectTask.findByIdAndRemove(id);
}