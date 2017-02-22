(function () {
  "use strict";

  angular.module('public')
  .controller('NewsletterController',NewsletterController);

  NewsletterController.$inject = ['NewsletterService'];
  function NewsletterController(NewsletterService){
    var reg = this;
    reg.info = {};

    reg.submit = function () {
      NewsletterService.checkMenuItem(reg.info.dish).then(function(response){
        if(response){
          reg.info.dish = reg.info.dish.toUpperCase();
          NewsletterService.info = reg.info;
          reg.message = 'Your information has been saved';
        }
        else {
          reg.message = 'No such menu number exists';
        }
      });
 };
  }
})();
