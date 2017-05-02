angular.module('Beerbuds', [
  'ngRoute',
  'mobile-angular-ui',
  'Beerbuds.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});