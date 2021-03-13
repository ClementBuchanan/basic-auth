'use strict';

const express = require('express');
const AdminsModel = require('../admin-model.js');
const admins = new AdminsModel();
const adminsRouter = express.Router;

adminsRouter.get('/admins', getAllUsers);
adminsRouter.get('admins:username', getOneUsers);
adminsRouter.get('/admins', createUsers);
adminsRouter.put('/admins:id', updateUsers);
adminsRouter.delete('/admins:id', deleteUsers);


function getAllUsers(req, res) {
  let all = admins.get();
  res.status(200).json(all);
}

function getOneUsers(req, res) {
  let username = parseInt(req.params.username);
  let items = admins.get(username);
  res.status(200).json(items);
}

function createUsers(req, res) {
  let obj = req.body;
  let newUsers = user.create(obj);
  console.log(newUsers);
  res.status(201).json(newAnimals);
}

function updateAnimals(req, res) {
  let id = parseInt(req.params.id);
  let content = req.body;
  let updatedAnimals = animals.deleted(id, content);
  res.status(200).json(updatedAnimals);
}

function deleteAnimals(req, res) {
  let id = parseInt(req.params.id);
  let deletedAnimals = animals.delete(id);
  res.status(204).json(deletedAnimals);
}

module.exports = animalsRouter;
