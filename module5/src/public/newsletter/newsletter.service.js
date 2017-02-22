(function () {
  "use strict";

  angular.module('public')
  .service('NewsletterService', NewsletterService);

  NewsletterService.$inject = ['$http','ApiPath'];
  function NewsletterService($http,ApiPath){
    var service = this;
    var info = {};
    // var name = '';
    // var lastname ='';
    // var email = '';
    // var phone = '';
    // var dish = '';

    service.checkMenuItem = function(item){
      return $http.get(ApiPath + '/menu_items/'+item.toUpperCase()+'.json')
      .then(function (response) {
        return response.data;
      },
      function (response) {
        return null;
      });
    }
  }
})();
