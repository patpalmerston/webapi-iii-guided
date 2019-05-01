const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');// protection for all projects
const morgan = require('morgan')// info on console

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use(helmet());// protects projects always use
server.use(morgan('dev'))// info on console
server.use(teamNamer);
server.use(moodyGateKeeper);
// server.use(passCode)

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

function moodyGateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();
  if (seconds % 3 === 0) {
    res.status(403).json({ you: 'Shall not pass!' })
  } else {
    next();
  }
}

// function passCode(req, res, next) {
//   req.pass = 'you shall not pass';
//   const time = new Date().toString();
//   if(time / 3 === 0) {
//     console.log(req.pass)
//   }
// } my version

module.exports = server;
