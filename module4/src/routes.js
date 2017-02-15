(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as category',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Item detail
  .state('items', {
    url: '/items/{shortName}',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController as itemLister',
    resolve:{
      items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){
        return MenuDataService.getItemsForCategory($stateParams.shortName)
      }]
    }
  });

}

})();
