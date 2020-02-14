const express = require('express');
const actionsDatabase = require('../data/helpers/actionModel');
const {validateActions, validateActionId} = require('../utils');
const router = express.Router();

// /api/projects/actions
router.get('/', (req, res) =>
{
    actionsDatabase.get()
    .then(actions =>
    {
        res.status(200).json(actions);
    })
    .catch(err =>
    {
        res.status(500).json({error: 'Projects could not be retrieved from the database'});
    })
})

router.get('/:id', validateActionId, (req, res) =>
{
    res.status(200).json(req.action);
})

router.put('/:id', validateActionId, (req, res) =>
{
    const updateAction = {
        project_id: req.action.project_id,
        description: req.body.description ? req.body.description : req.action.description,
        notes: req.body.notes ? req.body.notes : req.action.notes,
        completed: req.body.completed ? req.body.completed : req.action.notes
    }

    actionsDatabase.update(req.action.id, updateAction)
    .then(updatedAction =>
    {
        res.status(200).json(updateAction);
    })
    .catch(err =>
    {
        res.status(500).json({error: 'There was error updating the action to the database'});
    })
})

module.exports = router;