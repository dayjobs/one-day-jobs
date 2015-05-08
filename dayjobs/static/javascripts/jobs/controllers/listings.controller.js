/**
* ListingsController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('ListingsController', ListingsController);

  ListingsController.$inject = ['$location', '$rootScope', '$routeParams', '$scope', 'Authentication', 'Snackbar', 'Jobs'];

  /**
  * @namespace ListingsController
  */
  function ListingsController($location, $rootScope, $routeParams, $scope, Authentication, Snackbar, Jobs) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.jobs = [];
    vm.filter = 'active';
    vm.destroy = destroy;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.jobs.controllers.ListingsController
    */
    function activate() {
      var filter = $routeParams.filter;

      if(filter == 'previous') {
        vm.filter = filter;
        Jobs.previous_listings().success(function(data, status, headers, config) {
          vm.jobs = data;
        }).error(function(data, status, headers, config) {
          $location.url('/');
        });
      }
      else {
        Jobs.active_listings().success(function(data, status, headers, config) {
          vm.jobs = data;
        }).error(function(data, status, headers, config) {
          $location.url('/');
        });
      }

    }

    /**
    * @name destroy
    * @desc destroy a job
    * @memberOf dayjobs.jobs.controllers.ListingsController
    */
    function destroy(slug) {
      $rootScope.$broadcast('job.destroy', {
        job: slug,
      });

      Jobs.destroy(slug).then(destroyJobSuccessFn, destroyJobErrorFn);

      /**
      * @name destroyJobSuccessFn
      * @desc Show snackbar with success message
      */
      function destroyJobSuccessFn(data, status, headers, config) {
        $location.url('/listings');
        Snackbar.show('Success! Job destroyd.');
      }


      /**
      * @name destroyJobErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function destroyJobErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('job.apply.error');
        Snackbar.error(data.error);
      }
    }
  }
})();
