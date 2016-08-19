var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'static/partials/index.html',
        controller: 'indexController'
    })
    .when('/dashboard', {
        templateUrl: 'static/partials/dashboard.html',
        controller: 'dashboardController'
    })
    .when('/new_question', {
        templateUrl: 'static/partials/new_question.html',
        controller: 'questionsController'
    })
    .when('/question/:id/new_answer', {
        templateUrl: 'static/partials/new_answer.html',
        controller: 'answersController'
    })
    .when('/question/:id', {
        templateUrl: 'static/partials/question.html',
        controller: 'questionsController'
    })
    .otherwise({
        redirectTo: '/'
    });
});