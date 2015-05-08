/**
* JobListingController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('JobListingController', JobListingController);

  JobListingController.$inject = ['$location', '$rootScope', '$routeParams', '$scope', 'Authentication', 'Snackbar', 'Jobs'];

  /**
  * @namespace JobListingController
  */
  function JobListingController($location, $rootScope, $routeParams, $scope, Authentication, Snackbar, Jobs) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.job_matches = undefined;
    vm.accept = accept;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.jobs.controllers.JobListingController
    */
    function activate() {
      var slug = $routeParams.slug;

      Jobs.job_matches(slug).then(jobsuccessFn, jobErrorFn);

      /**
      * @name jobsuccessFn
      */
      function jobsuccessFn(data, status, headers, config) {
        vm.job_matches = data.data;
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
    * @name accept
    * @desc accept a job
    * @memberOf dayjobs.jobs.controllers.ListingsController
    */
    function accept(id, status) {
      $rootScope.$broadcast('job.accept', {
        job_match: id,
      });

      var slug = $routeParams.slug;

      Jobs.accept(id, status).then(acceptJobSuccessFn, acceptJobErrorFn);

      /**
      * @name acceptJobSuccessFn
      * @desc Show snackbar with success message
      */
      function acceptJobSuccessFn(data, status, headers, config) {
        $location.url('/listings/jobs/' + slug);
        Snackbar.show('Success! Match Accepted.');
      }


      /**
      * @name acceptJobErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function acceptJobErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('job.apply.error');
        Snackbar.error(data.error);
      }
    }
  }
})();
