app.factory('dashboardFactory', function($http){
  
    var factory = {};

    factory.session = function(callback){
        $http.get('/users/session').success(function(output){
            callback(output);
        });
    };

    factory.logout = function(){
      $http.post('/logout/')      
    };

    return factory;
});