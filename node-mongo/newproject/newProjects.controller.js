const express = require('express');
const router = express.Router();
const newProjectService = require('./newProject.service');

// routes
router.post('/createProject', createProject);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createProject(req, res, next) {
    console.log("Creating new project");
    console.log(req.body);
    newProjectService.create(req.body)
        .then(data => res.json(data))
        .catch(err => {
            console.log("there was an error");
            console.log(err);
            next(err)
        } );
}

function getAll(req, res, next) {
    newProjectService.getAll()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    newProjectService.getById(req.newProject.sub)
        .then(newProject => newProject ? res.json(newProject) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    newProjectService.getById(req.params.id)
        .then(newProject => newProject ? res.json(newProject) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    newProjectService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    newProjectService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


// employer.associate = function(db) {
//     employer.hasMany(db.add_gigs, {
//       foreignKey: 'employer_id' 
//     })
  
// }

// function createNewProject(req, res, next) {
//     projectdb.create(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function getAll(req, res, next) {
//     projectdb.getAll()
//         .then(projects => res.json(projects))
//         .catch(err => next(err));
// }

// function getCurrent(req, res, next) {
//     projectdb.getById(req.project.sub)
//         .then(project => project ? res.json(project) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function getById(req, res, next) {
//     projectdb.getById(req.params.id)
//         .then(project => project ? res.json(project) : res.sendStatus(404))
//         .catch(err => next(err));
// }

// function update(req, res, next) {
//     projectdb.update(req.params.id, req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

// function _delete(req, res, next) {
//     projectdb.delete(req.params.id)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }