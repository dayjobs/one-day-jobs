/**
* NewJobController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('NewJobController', NewJobController);

  NewJobController.$inject = ['$location', '$rootScope', '$scope', 'Authentication', 'Snackbar', 'Jobs', 'GeoCoder'];

  /**
  * @namespace NewJobController
  */
  function NewJobController($location, $rootScope, $scope, Authentication, Snackbar, Jobs, GeoCoder) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new job
    * @memberOf dayjobs.jobs.controllers.NewJobController
    */
    function submit() {
      $rootScope.$broadcast('job.created', {
        name: vm.name,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        },
        description: vm.description,
        date: vm.date,
        salary: vm.salary,
        location: vm.location,
        hours: vm.hours,
        slots: vm.slots
      });

      GeoCoder.geocode({address: vm.location}).then(function(result) {
        vm.coords_location = {lat:result[0].geometry.location.A, long:result[0].geometry.location.F};
        Jobs.create(vm.name, vm.description, vm.location, vm.coords_location.lat + ',' + vm.coords_location.long, vm.date, vm.salary, vm.hours, vm.slots).then(createJobSuccessFn, createJobErrorFn);

        /**
        * @name createJobSuccessFn
        * @desc Show snackbar with success message
        */
        function createJobSuccessFn(data, status, headers, config) {
          $location.url('/');
          Snackbar.show('Success! job created.');
        }


        /**
        * @name createJobErrorFn
        * @desc Propogate error event and show snackbar with error message
        */
        function createJobErrorFn(data, status, headers, config) {
          $rootScope.$broadcast('job.created.error');
          Snackbar.error(data.error);
        }
      });
    }
  }
})();
