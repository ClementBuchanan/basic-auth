'use strict';

const express = require('express');
const WriterModel = require('../models/writer-model.js');
const writers = new WriterModel();
const writersRouter = express.Router();

writersRouter.get('/writers:username', readArticle);
writersRouter.get('/writers', createArticle);

function readArticle (req, res) {
  let all = writers.get();
  res.status(200).json(all);
}

function createArticle(req, res) {
  let obj = req.body;
  let newArticle = writers.create(obj);
  console.log(newArticle);
  res.status(201).json(newArticle);
}
module.exports = writersRouter;
