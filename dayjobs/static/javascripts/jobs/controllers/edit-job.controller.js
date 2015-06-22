/**
* EditJobController
* @namespace dayjobs.jobs.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.controllers')
    .controller('EditJobController', EditJobController);

  EditJobController.$inject = ['$location', '$rootScope', '$routeParams', '$scope', 'Authentication', 'Snackbar', 'Jobs', 'GeoCoder'];

  /**
  * @namespace EditJobController
  */
  function EditJobController($location, $rootScope, $routeParams, $scope, Authentication, Snackbar, Jobs, GeoCoder) {
    var vm = this;

    vm.job = undefined;
    vm.submit = submit;
    activate();

    function activate() {
      var slug = $routeParams.slug;

      Jobs.get(slug).then(jobsuccessFn, jobErrorFn);

      /**
      * @name jobsuccessFn
      */
      function jobsuccessFn(data, status, headers, config) {
        vm.job = data.data;
        vm.name = vm.job.name;
        vm.description = vm.job.description;
        vm.salary = vm.job.salary;
        vm.salary = vm.job.salary;
        vm.hours = vm.job.hours;
        vm.slots = vm.job.slots_count;
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
