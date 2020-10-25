const express = require('express');
const taskRouter = express.Router();

const pool = require('../modules/pool.js'); //connects database to router file

// GET - Retrieves task and completion information to database

taskRouter.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "tasks" ORDER BY "id" DESC;';

  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// POST - Sends task and completion information to database

taskRouter.post('/', (req, res) => {
  const tasks = req.body;
  const queryText = `INSERT INTO "tasks" ("task", "completed")  
    VALUES ($1, $2);`;

  const queryArray = [tasks.task, tasks.completed];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// DELETE - Sends deletion information to database
taskRouter.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const queryText = `DELETE FROM "tasks" WHERE id=$1;`;
  const queryArrayData = [taskId];

  pool
    .query(queryText, queryArrayData)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// UPDATE - Sends updated completion status to database
taskRouter.put('/complete/:id', (req, res) => {
  const tasks = req.body;
  const queryText = `UPDATE "tasks" SET completed=$1 WHERE id=$2;`;
  const queryArray = [tasks.completed, req.params.id];

  pool
    .query(queryText, queryArray)
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = taskRouter; //exports information to server.js
