const express = require('express');
const taskRouter = express.Router();

const pool = require('../modules/pool.js');

// GET

taskRouter.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "tasks" ORDER BY "id";';

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

// POST

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

taskRouter.delete('/:id', (req, res) => {
  // req.params is {} { id: '' }
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

module.exports = taskRouter;
