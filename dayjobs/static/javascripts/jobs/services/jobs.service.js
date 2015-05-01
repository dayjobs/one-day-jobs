/**
* Jobs
* @namespace dayjobs.jobs.services
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.services')
    .factory('Jobs', Jobs);

  Jobs.$inject = ['$http', 'localStorageService'];

  /**
  * @namespace Jobs
  * @returns {Factory}
  */
  function Jobs($http, localStorageService) {

    var Jobs = {
      all: all,
      create: create,
      get: get,
      fresh: fresh,
    };

    return Jobs;

    ////////////////////

    /**
    * @name all
    * @desc Get all Jobs
    * @returns {Promise}
    * @memberOf dayjobs.jobs.services.Jobs
    */
    function all() {
      return $http.get('/api/v1/jobs');
    }


    /**
    * @name create
    * @desc Create a new Job
    * @param {string} content The content of the new Job
    * @returns {Promise}
    * @memberOf dayjobs.jobs.services.jobs
    */
     function create(name, description, date, salary, hours, slots) {
      return $http({method: 'POST', url: '/api/v1/jobs',
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              },
              data: {
                'name': name,
                'description': description,
                'date': date,
                'salary': salary,
                'hours': hours,
                'slots': slots
              }
              });
    };

    /**
     * @name get
     * @desc Get the Jobs of a given user
     * @param {string} username The username to get Jobs for
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function get(username) {
      return $http.get('/api/v1/users/' + username + '/jobs');
    }

    /**
     * @name fresh
     * @desc Get the Fresh jobs
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function fresh() {
      return $http.get('/api/v1/jobs/fresh');
    }

  }
})();
