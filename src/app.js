const express = require('express');
const readerRouter = require('./routes/reader');
const bookRouter = require('./routes/book');
const authorRouter = require('./routes/author');

const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

app.use('/', bookRouter);

app.use('/', authorRouter);

module.exports = app;
