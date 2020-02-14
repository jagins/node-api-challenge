const express = require('express');
const actionsDatabase = require('../data/helpers/actionModel');
const {validateActions} = require('../utils');
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

module.exports = router;