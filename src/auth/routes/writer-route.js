'use strict';

const express = require('express');
const WriterModel = require('../models/writer-model.js');
const writer = new WriterModel();
const writerRouter = express.Router();

