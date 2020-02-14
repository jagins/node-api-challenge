const express = require('express');
const router = express.Router();
const projectDatabase = require('../data/helpers/projectModel');
const {validateID} = require('../utils');

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

module.exports = router;