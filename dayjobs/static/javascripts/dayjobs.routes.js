(function () {
  'use strict';

  angular
    .module('dayjobs.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/', {
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html',
    }).when('/jobs/new', {
      controller: 'NewJobController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/new-job.html',
    }).when('/jobs/:slug', {
      controller: 'JobDetailController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/job-detail.html'
    }).when('/jobs', {
      controller: 'JobsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/job-list.html'
    }).otherwise('/');
  }
})();
