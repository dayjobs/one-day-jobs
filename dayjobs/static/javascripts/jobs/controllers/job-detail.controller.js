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

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.job = undefined;
    vm.apply = apply;
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

    /**
    * @name apply
    * @desc Apply to a job
    * @memberOf dayjobs.jobs.controllers.JobDetailController
    */
    function apply() {
      $rootScope.$broadcast('job-match.apply', {
        job: vm.job.id,
        worker: {
          username: Authentication.getAuthenticatedAccount().username
        },
      });

      Jobs.apply(vm.job.id).then(applyJobSuccessFn, applyJobErrorFn);

      /**
      * @name applyJobSuccessFn
      * @desc Show snackbar with success message
      */
      function applyJobSuccessFn(data, status, headers, config) {
        $location.url('/dashboard');
        Snackbar.show('Success! Applied to job.');
      }


      /**
      * @name applyJobErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function applyJobErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('job.apply.error');
        Snackbar.error(data.error);
      }
    }
  }
})();
