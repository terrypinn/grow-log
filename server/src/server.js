const express = require('express');
const cors = require('cors');

const errorHandler = require('./middleware/errorHandler');

const indexRouter = require('./routes/index');
const logsRouter = require('./routes/logs');
const plantsRouter = require('./routes/plants');

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use(indexRouter);
app.use(logsRouter);
app.use(plantsRouter);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

module.exports = app;