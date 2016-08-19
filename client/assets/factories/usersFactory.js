app.factory('usersFactory', function($http){
    
    var factory = {};

    factory.index = function(id, callback){
        $http.get('/user/' + id).then(function(returned_data){          
            console.log(returned_data.data[0].name)
        callback(returned_data)
      });
    };

    factory.login = function(user, callback){
        console.log('userFactory login!')
        $http.post('/users', user).then(function(returned_data){          
            // console.log(returned_data.data[0].name)
            console.log(returned_data)
        callback(returned_data)
      });
    };

    factory.logout = function(){
      $http.post('/users/logout/')
    };

    return factory;
});