(function () {
  'use strict';

  angular
    .module('dayjobs.jobs', [
      'dayjobs.jobs.controllers',
      'dayjobs.jobs.directives',
      'dayjobs.jobs.services',
      'infinite-scroll',
      'relativeDate'
    ]);

  angular
    .module('dayjobs.jobs.controllers', ['ngMap', 'geolocation']);

  angular
    .module('dayjobs.jobs.directives', ['ngDialog']);

  angular
    .module('dayjobs.jobs.services', ['LocalStorageModule']);
})();
