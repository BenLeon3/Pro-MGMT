const express = require('express');
const router = express.Router();
const projectTaskService = require('./projectTask.service');

// routes
router.post('/createTask', createTask);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function createTask(req, res, next) {
    console.log("Creating task");
    console.log(req.body);
    projectTaskService.create(req.body)
        .then(data => res.json(data))
        .catch(err => {
            console.log("there was an error");
            console.log(err);
            next(err)
        } );
}

function getAll(req, res, next) {
    projectTaskService.getAll()
        .then(newTasks => res.json(newTasks))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    projectTaskService.getById(req.newTask.sub)
        .then(newTask => newTask ? res.json(newTask) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    projectTaskService.getById(req.params.id)
        .then(newTask => newTask ? res.json(newTask) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    projectTaskService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    projectTaskService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


// employer.associate = function(db) {
//     employer.hasMany(db.add_gigs, {
//       foreignKey: 'employer_id' 
//     })
  
// }