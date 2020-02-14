const express = require('express');

const server = express();
server.use(express.json());

server.get('/', (req, res) =>
{
    res.json({message: 'Sprint challenge 1'});
})

const PORT = 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));