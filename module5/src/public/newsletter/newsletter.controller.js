(function () {
  "use strict";

  angular.module('public')
  .controller('NewsletterController',NewsletterController);

  NewsletterController.$inject = ['NewsletterService'];
  function NewsletterController(NewsletterService){
    var reg = this;
    reg.info = {};
    reg.info.name="asdf";
    reg.info.lastname="fdsa";
    reg.info.email="enrique@popo"
    reg.info.phone="123-456-7890";
    reg.info.dish="f1";
    reg.message ='';

    reg.submit = function () {
      NewsletterService.checkMenuItem(reg.info.dish).then(function(response){
        // console.log(response);
        if(response){
          NewsletterService.info = reg.info;
          reg.message = 'Your information has been saved';
        }
        else {
          reg.message = 'No such menu number exists';
        }
      });
      // console.log(NewsletterService.info.name);
      // console.log(NewsletterService.info.lastname);
      // console.log(NewsletterService.info.email);
      // console.log(NewsletterService.info.phone);
      // console.log(NewsletterService.info.dish.toUpperCase());
 };
  }
})();
