(function () {
  'use strict';

  angular
    .module('dayjobs.authentication', [
      'dayjobs.authentication.controllers',
      'dayjobs.authentication.directives',
      'dayjobs.authentication.services'
    ]);

  angular
    .module('dayjobs.authentication.controllers', ['facebook']);

  angular
    .module('dayjobs.authentication.directives', []);

  angular
    .module('dayjobs.authentication.services', ['ngCookies', 'LocalStorageModule']);
})();
