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
    vm.search = search;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.jobs.controllers.JobsController
    */
    function activate() {
      var slug = $routeParams.slug;
      var location = $routeParams.location;
      var date = $routeParams.date;

      Jobs.search(location, date).then(jobsuccessFn, jobErrorFn);

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

    /**
    * @name search
    * @desc Search a job
    * @memberOf dayjobs.jobs.controllers.JobsController
    */
    function search() {
      Jobs.search(vm.location, vm.date).then(searchJobSuccessFn, searchJobErrorFn);

      /**
      * @name searchJobSuccessFn
      * @desc Show snackbar with success message
      */
      function searchJobSuccessFn(data, status, headers, config) {
        var applyFn = function () {
            vm.jobs = data.data.results;
        };
        if ($scope.$$phase) { // most of the time it is "$digest"
            applyFn();
        } else {
          $scope.$apply(applyFn);
        }
      }


      /**
      * @name searchJobErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function searchJobErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('job.search.error');
        Snackbar.error(data.error);
      }
    }
  }
})();
