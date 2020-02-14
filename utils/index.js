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

function validateProject(req, res, next)
{
  if(!req.body.name && !req.body.description)
  {
      res.status(400).json({error: 'missing project information'});
  }
   
  if(!req.body.name)
  {
    res.status(400).json({error: 'missing required name field'});
  }
  if(!req.body.description)
  {
    res.status(400).json({error: 'missing required description field'});
  }
  else
  {
    next();
  }
}

module.exports = {validateID, validateProject};