const mongoose = require('mongoose')
const Question = mongoose.model('questions')
const User = mongoose.model('users')
const Answer = mongoose.model('answers')

module.exports = (function() {
  return {

    create: function(req, res){
        var answer = new Answer(req.body)
        answer.save(function(err, result){
            if(err){
                res.json({error:err});
            }else{
              User.update({ _id : req.session.userId }, { $push : { _answers : result._id } },function(err, updatedUser) {
                Question.update({ _id : result._question }, { $push : { _answers : result._id } },function(err, updatedTopic) {
                  res.send(result);
                });
              });
            }
        });
    },

    findOne: function(req, res){
         Answer.findOne({_id:req.params.id}) // populate not necessary for this assignment, demonstration purpose only!
            // .populate({
            //   path: '_answers', 
            //   model: 'answers',
            //   populate: {
            //     path: '_question',
            //     model: 'questions'
            //   }, 
            //   populate:{
            //     path: '_user',
            //     model: 'users'
            //   },
            // })
        .exec(function(err, results){
            if(err){
              console.log(err);
            }else{
                res.json(results);
            }
        })
    },


    index: function(req, res){
        Answer.find({})
            .populate({  // populate not necessary for this assignment, demonstration purpose only!
              path: '_user', 
              model: 'users',
              populate: {
                path: '_answers',
                model: 'answers',
                  populate: {
                  path: '_user',
                  model: 'users',
                  },
              },
          })
            .populate({
              path: '_question', 
              model: 'questions',
              // populate: {
              //   path: '_user',
              //   model: 'User',
              // },
          })
        .exec(function(err, results){
            if(err){
              console.log(err);
            }else{
                res.json(results);
            }
        })
    },

    like : function(req, res) {
        console.log('up id', req)
        Answer.update({ _id : req.params.id }, { $inc : { like : 1 } }, function(err, updated) {
          if (err) return res.send(err);

          res.send({success : true});
        });
      },
  }
})();