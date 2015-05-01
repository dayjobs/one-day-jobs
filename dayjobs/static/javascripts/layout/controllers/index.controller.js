/**
* IndexController
* @namespace dayjobs.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Feed', 'Snackbar', 'Jobs', 'Authentication'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Feed, Snackbar, Jobs, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.fresh_jobs = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.jobs.controllers.IndexController
    */
    function activate() {
      Jobs.fresh().then(freshJobsSuccessFn, freshJobsErrorFn);

      /**
        * @name freshJobsSucessFn
        */
      function freshJobsSuccessFn(data, status, headers, config) {
        vm.fresh_jobs = data.data;
      }


      /**
        * @name freshJobsErrorFn
        * @desc Show error snackbar
        */
      function freshJobsErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }
  }
})();
