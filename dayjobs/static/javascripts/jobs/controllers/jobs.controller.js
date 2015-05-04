/**
* JobsController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('JobsController', JobsController);

  JobsController.$inject = ['$location', '$rootScope', '$routeParams', '$scope', 'Authentication', 'Snackbar', 'Jobs'];

  /**
  * @namespace JobsController
  */
  function JobsController($location, $rootScope, $routeParams, $scope, Authentication, Snackbar, Jobs) {
    var vm = this;

    vm.jobs = [];
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.jobs.controllers.JobsController
    */
    function activate() {
      var slug = $routeParams.slug;

      Jobs.all().then(jobsuccessFn, jobErrorFn);

      /**
      * @name jobsuccessFn
      */
      function jobsuccessFn(data, status, headers, config) {
        vm.jobs = data.data.results;
      }


      /**
      * @name jobErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function jobErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('Invalid query.');
      }
    }
  }
})();
