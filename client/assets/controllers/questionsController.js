app.controller('questionsController', function(questionsFactory, dashboardFactory, answersFactory, $location, $routeParams, $scope){

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

    $scope.like = function(answerId){
        console.log('thumbs up!', answerId)
        if (answerId) {
            answersFactory.like(answerId, (data)=>{
                console.log('returned', data);$scope.error = data.error;}) ;
            index();
        }
    };

    $scope.createQuestion = function(newQuestion){
        if (newQuestion) {
            newQuestion._user = $scope.session.userId;

            console.log('I want to create this newQuestion', newQuestion);
            questionsFactory.create(newQuestion, (data)=>{
                console.log('returned', data);$scope.error = data.error;}) ;
            $location.path('/dashboard')
        } else {
            $scope.message = "Minimum of 10 characters required"
        }
    };

});