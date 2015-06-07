/**
* EditJobController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('EditJobController', EditJobController);

  EditJobController.$inject = ['$location', '$rootScope', '$scope', 'Authentication', 'Snackbar', 'Jobs', 'GeoCoder'];

  /**
  * @namespace EditJobController
  */
  function EditJobController($location, $rootScope, $scope, Authentication, Snackbar, Jobs, GeoCoder) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Update job
    * @memberOf dayjobs.jobs.controllers.EditJobController
    */
    function submit() {
      var slug = $routeParams.slug;

      $rootScope.$broadcast('job.updated', {
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
        Jobs.update(slug, vm.name, vm.description, vm.location, vm.coords_location.lat + ',' + vm.coords_location.long, vm.date, vm.salary, vm.hours, vm.slots).then(updateJobSuccessFn, updateJobErrorFn);

        /**
        * @name updateJobSuccessFn
        * @desc Show snackbar with success message
        */
        function updateJobSuccessFn(data, status, headers, config) {
          $location.url('/listings');
          Snackbar.show('Success! job updated.');
        }


        /**
        * @name updateJobErrorFn
        * @desc Propogate error event and show snackbar with error message
        */
        function updateJobErrorFn(data, status, headers, config) {
          $rootScope.$broadcast('job.updated.error');
          Snackbar.error(data.error);
        }
      });
    }
  }
})();
