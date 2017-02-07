(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems(){
  var ddo = {
    restrict: "E",
    templateUrl: 'items.html',
    scope:{
      items: '<items'
    }
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.searchTerm="";
  narrow.found=[];

  narrow.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    console.log("Last item removed was " + narrow.found[itemIndex]);
    MenuSearchService.removeItem(itemIndex);
  };

  narrow.getNarrowedItems = function (searchTerm) {
    // console.log(searchTerm);
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      narrow.found = response;
      // console.log(narrow.found);
      console.log(response.length);
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
          // console.log(dish);
        }
      }
      return found;
    });
  };

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
    console.log(found.length);
  };

}

})();
