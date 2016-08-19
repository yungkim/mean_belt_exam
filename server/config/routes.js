const mongoose = require('mongoose')
const users = require('./../controllers/users.js');
const questions = require('./../controllers/questions.js');
const answers = require('./../controllers/answers.js');

module.exports = function(app){

  app.get('/users/session', users.session);
  app.get('/users', users.index) // get all users
  app.post('/users', users.login);
  app.post('/users/logout', users.logout);

  app.get('/questions', questions.index)
  app.post('/questions', questions.create)
  app.get('/question/:id', questions.findOne)

  app.get('/answers', answers.index)
  app.post('/answers', answers.create)
  app.put('/answers/:id/like', answers.like)
  app.get('/answer/:id', answers.findOne)
}