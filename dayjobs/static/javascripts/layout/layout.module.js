(function () {
  'use strict';

  angular
    .module('dayjobs.layout', [
      'dayjobs.layout.controllers',
    ]);

  angular
    .module('dayjobs.layout.controllers', ['facebook']);
})();
