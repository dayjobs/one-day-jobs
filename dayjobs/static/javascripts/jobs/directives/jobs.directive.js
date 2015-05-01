/**
* Jobs
* @namespace dayjobs.jobs.directives
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.directives')
    .directive('jobs', jobs);

  /**
  * @namespace Jobs
  */
  function jobs() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf dayjobs.jobs.directives.jobs
    */
    var directive = {
      restrict: 'E',
      scope: {
        jobs: '='
      },
      templateUrl: '/static/templates/jobs/jobs.html'
    };

    return directive;
  }
})();
