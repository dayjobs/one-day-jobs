/**
* JobDetailController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('JobDetailController', JobDetailController);

  JobDetailController.$inject = ['$location', '$rootScope', '$routeParams', '$scope', 'Authentication', 'Snackbar', 'Jobs'];

  /**
  * @namespace JobDetailController
  */
  function JobDetailController($location, $rootScope, $routeParams, $scope, Authentication, Snackbar, Jobs) {
    var vm = this;

    vm.job = undefined;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.jobs.controllers.JobDetailController
    */
    function activate() {
      var slug = $routeParams.slug;

      Jobs.get(slug).then(jobsuccessFn, jobErrorFn);

      /**
      * @name jobsuccessFn
      */
      function jobsuccessFn(data, status, headers, config) {
        vm.job = data.data;
      }


      /**
      * @name jobErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function jobErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That job does not exist.');
      }
    }
  }
})();
