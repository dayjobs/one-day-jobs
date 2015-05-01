(function () {
  'use strict';

  angular
    .module('dayjobs', [
      'dayjobs.config',
      'dayjobs.routes',
      'dayjobs.authentication',
      'dayjobs.layout',
      'dayjobs.jobs',
      'dayjobs.utils'
    ]);

  angular
    .module('dayjobs.config', ['facebook']);

  angular
    .module('dayjobs.routes', ['ngRoute']);

  angular
    .module('dayjobs')
    .run(run);

  run.$inject = ['$http'];

  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();
