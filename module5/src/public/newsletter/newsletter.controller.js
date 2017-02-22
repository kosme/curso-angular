(function () {
  "use strict";

  angular.module('public')
  .controller('NewsletterController',NewsletterController);

  NewsletterController.$inject = ['NewsletterService'];
  function NewsletterController(NewsletterService){
    var reg = this;
    reg.name="asdf";
    reg.lastname="fdsa";
    reg.email="enrique@popo"
    reg.phone="123-456-7890";
    reg.dish="f1";
    reg.message ='asdffdsaf';

    reg.submit = function () {
      NewsletterService.checkMenuItem(reg.dish).then(function(response){
        // console.log(response);
        if(response){
          NewsletterService.name = reg.name;
          NewsletterService.lastname = reg.lastname;
          NewsletterService.email = reg.email;
          NewsletterService.phone = reg.phone;
          NewsletterService.dish = reg.dish;
          reg.message = 'Your information has been saved';
        }
        else {
          reg.message = 'No such menu number exists';
        }
      });
      // console.log(NewsletterService.name);
      // console.log(NewsletterService.lastname);
      // console.log(NewsletterService.email);
      // console.log(NewsletterService.phone);
      // console.log(NewsletterService.dish.toUpperCase());
 };
  }
})();
