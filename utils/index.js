const projectDatabase = require('../data/helpers/projectModel');

function validateID(req, res, next)
{
    projectDatabase.get(req.params.id)
    .then(project =>
    {
        if(project)
        {
            req.project = project;
            next();
        }
        else
        {
            res.status(404).json({error: 'Invalid project ID'});
        }
    })
    .catch(err =>
    {
        res.status(500).json({error: 'Projects could not be retrieved from the database'});
    })
}

module.exports = {validateID};