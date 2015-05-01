(function () {
  'use strict';

  angular
    .module('dayjobs.config')
    .config(config);

  config.$inject = ['$locationProvider', 'FacebookProvider'];

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($locationProvider, $FacebookProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    var dayjobsId = '861972850543003';
    $FacebookProvider.init(dayjobsId);
  }
})();
