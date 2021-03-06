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
    }).when('/search', {
      controller: 'JobsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/job-list.html'
    }).when('/dashboard', {
      controller: 'DashboardController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/dashboard.html'
    }).when('/dashboard/:filter', {
      controller: 'DashboardController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/dashboard.html'
    }).when('/listings/', {
      controller: 'ListingsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/listings.html'
    }).when('/listings/jobs/:slug', {
      controller: 'JobListingController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/job-listing.html'
    }).when('/listings/jobs/:slug/edit', {
      controller: 'EditJobController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/edit-job.html'
    }).when('/listings/:filter', {
      controller: 'ListingsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/jobs/listings.html'
    }).otherwise('/');
  }
})();
