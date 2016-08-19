app.controller('answersController', function(answersFactory, dashboardFactory, questionsFactory, $location, $routeParams, $scope){

    $scope.id = $routeParams.id;

    var index = function(){
        questionsFactory.findOne($routeParams.id, function(data){
            $scope.question = data.data;
            console.log(data)
        });
        dashboardFactory.session(function(data){
            $scope.session = data;
            if (data.error) {
                $location.path('/')
            }
        });
    };
    index();

    $scope.cancel = function(){
        window.history.back();
    };

    $scope.createAnswer = function(newAnswer){
        if (newAnswer) {
            newAnswer._user = $scope.session.userId;
            newAnswer._question = $routeParams.id;
            console.log('I want to create this newAnswer', newAnswer);
            answersFactory.create(newAnswer, (data)=>{
                console.log('returned', data);$scope.error = data.error;}) ;
            $location.path('/dashboard')
        } else {
            $scope.message = "Minimum of 5 characters required"
        }
    };

});