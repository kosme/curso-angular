(function () {
  "use strict";

  angular.module('public')
  .controller('InformationController',InformationController);


  InformationController.$inject = ['NewsletterService','ApiPath'];
  function InformationController(NewsletterService, ApiPath) {
    var $ctrl = this;
    $ctrl.ApiPath = ApiPath;
    console.log($ctrl.ApiPath);
    $ctrl.myinfo = NewsletterService.info;
    console.log($ctrl.myinfo);
    if($ctrl.myinfo===undefined)
      $ctrl.error = true;
    else {
      $ctrl.error = false;
      NewsletterService.checkMenuItem($ctrl.myinfo.dish).then(function(response){
        console.log(response);
        if(response){
          $ctrl.dish ={};
          $ctrl.dish.name = response.name;
          $ctrl.dish.description = response.description;
          $ctrl.dish.short_name = response.short_name;
        }
        else {
        }
      });
    }
    console.log($ctrl.error);

  }
})();
