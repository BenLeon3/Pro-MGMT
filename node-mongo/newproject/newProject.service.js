const config = require('config.json');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Project = db.Project;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Project.find().select();
}

async function getById(id) {
    return await Project.findById(id).select();
}

async function create(newProjectParam) {
    // validate
    if (await Project.findOne({ projectName: newProjectParam.projectName })) {
        throw 'Project Name "' + newProjectParam.projectName + '" is already taken';
    }

    const newProject = new Project(newProjectParam);

    // hash password
    // if (newProjectParam.password) {
    //     newProject.hash = bcrypt.hashSync(newProjectParam.description);
    // }

    // save user
    await newProject.save();
}

async function update(id, newProjectParam) {
    const newProject = await Project.findById(id);

    // validate
    if (!newProject) throw 'Project not found';
    if (newProject.projectName !== newProjectParam.projectName && await Project.findOne({ projectName: newProjectParam.projectName })) {
        throw 'Project name "' + newProjectParam.projectName + '" is already taken';
    }

    // // hash password if it was entered
    // if (newProjectParam.password) {
    //     newProjectParam.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    // copy userParam properties to user
    Object.assign(newProject, newProjectParam);

    await newProject.save();
}

async function _delete(id) {
    await Project.findByIdAndRemove(id);
}