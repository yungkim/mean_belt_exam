app.controller('dashboardController', function(dashboardFactory, usersFactory, questionsFactory, $location, $scope){

    var index = function(){
        questionsFactory.index(function(data){
            $scope.questions = data.data;
        });
        dashboardFactory.session(function(data){
            $scope.session = data;
            if (data.error) {
                $location.path('/')
            }
        });
    };
    index();

    $scope.logout = function(topic){
        usersFactory.logout()
    }

});