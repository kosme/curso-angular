(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItems(){
  var ddo = {
    restrict: "E",
    templateUrl: 'items.html',
    scope:{
      items: '<',
      onRemove:'&'
    },
    controller: itemsController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function itemsController(){
  var itemsControl = this;

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.searchTerm="";
  narrow.found=[];
  narrow.error = false;

  narrow.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

  narrow.getNarrowedItems = function (searchTerm) {
    narrow.error = false;
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      narrow.found = response;
      if(narrow.found.length==0)
      {
        narrow.error = true;
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var found = [];

  service.getMatchedMenuItems = function (searchTerm){
    found=[]; //Empty the variable
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result){
      for (var i=0;i<result.data['menu_items'].length;i++)
      {
        if(result.data['menu_items'][i]['description'].indexOf(searchTerm.toLowerCase())!==-1)
        {
          var dish = result.data['menu_items'][i];
          found.push(dish['name']+", "+dish['short_name']+", "+dish['description']);
        }
      }
      if(searchTerm==="")
        return [];
      return found;
    });
  };

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

}

})();
