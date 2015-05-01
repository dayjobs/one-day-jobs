/**
* job
* @namespace dayjobs.jobs.directives
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.jobs.directives')
    .directive('job', job);

  /**
  * @namespace Job
  */
  function job() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf dayjobs.jobs.directives.job
    */
    var directive = {
      restrict: 'E',
      scope: {
        job: '='
      },
      templateUrl: '/static/templates/jobs/job.html'
    };

    return directive;
  }
})();
