(function () {
'use strict';

angular.module('Data')
.component('categories', {
  templateUrl: 'src/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
