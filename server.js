const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');// protection for all projects
const morgan = require('morgan')// info on console

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use(helmet());// protects projects always use
server.use(morgan('dev'))// info on console
server.use(teamNamer);
// server.use(moodyGateKeeper);


// custom middleware

// server.use((req, res, next) => {
//   res.status(404).send('no time for it')
// })



server.use('/api/hubs',restricted, hubsRouter); // stick in middleware (restricted), daisy chain affect to intercept the process of calling the router.

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});


// custom middleware
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

function restricted(req, res, next) {
  const password = req.headers.password;
  if(password === 'mellon'){
    next();
  } else {
    res.status(401).json({ message: 'Invalid credentials'})
  }
}



module.exports = server;
