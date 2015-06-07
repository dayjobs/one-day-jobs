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
      search: search,
      apply: apply,
      accept: accept,
      destroy: destroy,
      all_matches: all_matches,
      active_matches: active_matches,
      accepted_matches: accepted_matches,
      previous_matches: previous_matches,
      job_matches: job_matches,
      active_listings: active_listings,
      previous_listings: previous_listings,
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
    * @returns {Promise}
    * @memberOf dayjobs.jobs.services.jobs
    */
     function create(name, description, location, location_coords, date, salary, hours, slots) {
      return $http({method: 'POST', url: '/api/v1/jobs',
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              },
              data: {
                'name': name,
                'description': description,
                'location': location,
                'location_coords': location_coords,
                'date': date,
                'salary': salary,
                'hours': hours,
                'slots': slots
              }
              });
    };

    /**
    * @name update
    * @desc Update a Job
    * @returns {Promise}
    * @memberOf dayjobs.jobs.services.jobs
    */
     function update(job, name, description, location, location_coords, date, salary, hours, slots) {
      return $http({method: 'PUT', url: '/api/v1/jobs' + job,
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              },
              data: {
                'name': name,
                'description': description,
                'location': location,
                'location_coords': location_coords,
                'date': date,
                'salary': salary,
                'hours': hours,
                'slots': slots
              }
              });
    };

    /**
    * @name destroy
    * @desc destroy a Job
    * @returns {Promise}
    * @memberOf dayjobs.jobs.services.jobs
    */
     function destroy(job) {
      return $http({method: 'DELETE', url: '/api/v1/jobs/' + job,
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              }
              });
    };

    /**
    * @name apply
    * @desc Apply to a Job
    * @returns {Promise}
    * @memberOf dayjobs.jobs.services.jobs
    */
     function apply(job) {
      return $http({method: 'post', url: '/api/v1/job_matches',
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              },
              data: {
                'job': job,
              }
              });
    };

    /**
    * @name accept
    * @desc Accept a user to a Job
    * @returns {Promise}
    * @memberOf dayjobs.jobs.services.jobs
    */
     function accept(id, status) {
     if(status == 'W') status = 'A';
     else status = 'W';
      return $http({method: 'PUT', url: '/api/v1/job_matches/' + id,
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              },
              data: {
                'status': status,
              }
              });
    };

    /**
     * @name get
     * @desc Get the Jobs
     * @param {string} slug The slug to get Jobs for
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function get(slug) {
      return $http.get('/api/v1/jobs/' + slug);
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

    /**
     * @name search
     * @desc Search jobs
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function search(location, date) {

      if (location && date) {
        return $http.get('/api/v1/jobs?location=' + location + '&date=' + date);
      }
      else if (location) {
        return $http.get('/api/v1/jobs?location=' + location);
      }
      else if(date) {
        return $http.get('/api/v1/jobs?date=' + date);
      }
      else return $http.get('/api/v1/jobs');
    }

    /**
     * @name all_matches
     * @desc Get the All Job matches
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function all_matches() {
      return $http({method: 'GET', url: '/api/v1/job_matches/all',
        headers: {
          'Authorization': 'Bearer facebook ' + localStorageService.get('token')
        }
      });
    }

    /**
     * @name active_matches
     * @desc Get the Active Job matches
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function active_matches() {
      return $http({method: 'GET', url: '/api/v1/job_matches/active',
        headers: {
          'Authorization': 'Bearer facebook ' + localStorageService.get('token')
        }
      });
    }

    /**
     * @name accepted_matches
     * @desc Get the Active Job matches
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function accepted_matches() {
      return $http({method: 'GET', url: '/api/v1/job_matches/accepted',
        headers: {
          'Authorization': 'Bearer facebook ' + localStorageService.get('token')
        }
      });
    }

    /**
     * @name previous_matches
     * @desc Get the Active Job matches
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function previous_matches() {
      return $http({method: 'GET', url: '/api/v1/job_matches/previous',
        headers: {
          'Authorization': 'Bearer facebook ' + localStorageService.get('token')
        }
      });
    }

    /**
     * @name job_matches
     * @desc Get the All Job matches linked to a job
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function job_matches(slug) {
      return $http({method: 'GET', url: '/api/v1/jobs/'+ slug +'/job_matches',
        headers: {
          'Authorization': 'Bearer facebook ' + localStorageService.get('token')
        }
      });
    }

    /**
     * @name active_listings
     * @desc Get the All active Job Listings
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function active_listings() {
      return $http({method: 'GET', url: '/api/v1/job_listings/active',
        headers: {
          'Authorization': 'Bearer facebook ' + localStorageService.get('token')
        }
      });
    }

    /**
     * @name get
     * @desc Get the All non active Job Listings
     * @returns {Promise}
     * @memberOf dayjobs.jobs.services.Jobs
     */
    function previous_listings() {
      return $http({method: 'GET', url: '/api/v1/job_listings/previous',
        headers: {
          'Authorization': 'Bearer facebook ' + localStorageService.get('token')
        }
      });
    }

  }
})();
