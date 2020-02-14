const express = require('express');
const router = express.Router();
const projectDatabase = require('../data/helpers/projectModel');
const actionsDatabase = require('../data/helpers/actionModel');
const {validateID, validateProject, validateActions} = require('../utils');

// api/projects
router.get('/', (req, res) =>
{
    projectDatabase.get()
    .then(projects =>
    {
        res.status(200).json(projects);
    })
    .catch(err =>
    {
        res.status(500).json({error: 'Projects could not be retrieved from the database'});
    })
})

router.get('/:id', validateID, (req, res) =>
{
    res.status(200).json(req.project);
})

router.get('/:id/actions', validateID, (req, res) =>
{
    projectDatabase.getProjectActions(req.project.id)
    .then(actions =>
    {
        if(actions.length === 0)
        {
            res.status(404).json({error: 'No actions found for this project'})
        }
        else
        {
            res.status(200).json(actions);
        }
    })
    .catch(err =>
    {
        res.status(500).json({error: 'Could not retrieve actions'});
    })
})

router.post('/', validateProject, (req, res) =>
{
    const newProject = {
        name: req.body.name,
        description: req.body.description,
        completed: false
    }

    projectDatabase.insert(newProject)
    .then(addedProject =>
    {
        res.status(201).json(addedProject);
    })
    .catch(err =>
    {
        res.status(500).json({error: 'There was an error saving to the database'});
    })
})

router.post('/:id/actions', validateID, validateActions, (req,res) =>
{
    const newAction = {
        project_id: req.project.id,
        description: req.body.description ? req.body.description : "",
        notes: req.body.notes ? req.body.notes : "",
        completed: req.body.completed ? req.body.completed : false
    }

    actionsDatabase.insert(newAction)
    .then(actionCreated =>
    {
        res.status(201).json(actionCreated);
    })
    .catch(err =>
    {
        res.status(500).json({error: 'error when trying to save the action'});
    })
})

router.put('/:id', validateID, (req, res) =>
{
    const updateProject = {
        name: req.body.name ? req.body.name : req.project.name,
        description: req.body.description ? req.body.description : req.project.description,
        completed: req.body.completed ? req.body.completed : req.project.completed
    };

    projectDatabase.update(req.project.id, updateProject)
    .then(updatedProject =>
    {
        res.status(200).json(updatedProject);
    })
    .catch(err =>
    {
        res.status(500).json({error: 'error updating project'});
    })
})
module.exports = router;