const express = require('express');
const helmet = require('helmet');
const actionRouter = require('./actions/actionRouter');
const projectRouter = require('./projects/projectRouter');

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/api/projects/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) =>
{
    res.json({message: 'Sprint challenge 1'});
})

const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));