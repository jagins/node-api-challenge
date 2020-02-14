const express = require('express');
const router = express.Router();
const projectDatabase = require('../data/helpers/projectModel');
const {validateID, validateProject} = require('../utils');

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
module.exports = router;