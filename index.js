const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    return res.status(200).json({Server: 'is running'});
})

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})