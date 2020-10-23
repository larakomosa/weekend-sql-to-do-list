const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('server/public'));

let taskRouter = require('./routes/tasks.router');
app.use('/tasks', taskRouter);

// Start express
const PORT = 5000;
app.listen(PORT, () => {
  console.log('up and running on port', PORT);
});
