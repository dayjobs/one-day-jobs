/**
* DashboardController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$location', '$rootScope', '$routeParams', '$scope', 'Authentication', 'Snackbar', 'Jobs'];

  /**
  * @namespace DashboardController
  */
  function DashboardController($location, $rootScope, $routeParams, $scope, Authentication, Snackbar, Jobs) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.jobs = [];
    vm.filter = 'active';
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.jobs.controllers.DashboardController
    */
    function activate() {
      var filter = $routeParams.filter;

      if(filter == 'accepted') {
        vm.filter = filter;
        Jobs.accepted_matches().success(function(data, status, headers, config) {
          vm.jobs = data;
        }).error(function(data, status, headers, config) {
          $location.url('/');
        });
      }
      else if(filter == 'previous') {
        vm.filter = filter;
        Jobs.active_matches().success(function(data, status, headers, config) {
          vm.jobs = data;
        }).error(function(data, status, headers, config) {
          $location.url('/');
        });
      }
      else {
        Jobs.previous_matches().success(function(data, status, headers, config) {
          vm.jobs = data;
        }).error(function(data, status, headers, config) {
          $location.url('/');
        });
      }
    }
  }
})();
