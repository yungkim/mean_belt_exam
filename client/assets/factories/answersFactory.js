app.factory('answersFactory', function($http){
    
    var factory = {};

    factory.create = function(answer, callback){
      $http.post('/answers/', answer).then(function(returned_data){
        // callback(returned_data.data)
      });
    };

    factory.index = function(callback){
        $http.get('/answers/').then(function(returned_data){         
        callback(returned_data)
      });
    };

    factory.findOne = function(id, callback){
        $http.get('/answer/' + id).then(function(returned_data){         
        //     console.log(returned_data.data[0])
        callback(returned_data)
      });
    };

    factory.like = function(answerId, callback){
      $http.put('/answers/' + answerId + '/like').then(function(returned_data){
        // callback(returned_data.data)
      });
    };

    return factory;
});