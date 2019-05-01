const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');// protection for all projects
const morgan = require('morgan')// info on console

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use(helmet());// protects projects always use
server.use(morgan('dev'))// info on console
server.use(teamNamer);

// costum middleware

// server.use((req, res, next) => {
//   res.status(404).send('no time for it')
// })



server.use('/api/hubs', hubsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

function teamNamer(req, res, next) {
  req.team = 'Lambda Students';
  next();
}

module.exports = server;
