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

module.exports = router;