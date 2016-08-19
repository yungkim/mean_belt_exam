const mongoose = require('mongoose')
const Question = mongoose.model('questions')
const User = mongoose.model('users')

module.exports = (function() {
  return {

    create: function(req, res){
        var question = new Question(req.body)
        question.save(function(err, result){
            if(err){
                res.json({error:err});
            }else{
            User.update({ _id : req.session.userId }, { $push : { _questions : result._id } }, function(err, updated) {
                res.send(result);
            });
        }
    })},

    findOne: function(req, res){
         Question.findOne({_id:req.params.id})
            .populate({
              path: '_answers', 
              model: 'answers',
              populate: {
                path: '_question',
                model: 'questions'
              }, 
              populate:{
                path: '_user',
                model: 'users'
              },
            })
        .exec(function(err, results){
            if(err){
              console.log(err);
            }else{
                res.json(results);
            }
        })
    },

    index: function(req, res){
        Question.find({})
            .populate({ // populate not necessary for this assignment, demonstration purpose only!
              path: '_answers', 
              model: 'answers',
              populate: {
                path: '_user',
                model: 'users',
              },
              populate: {
                path: '_question',
                model: 'questions',
              },
          })
        .exec(function(err, results){
            if(err){
              console.log(err);
            }else{
                res.json(results);
            }
        })
    },
  }

})();