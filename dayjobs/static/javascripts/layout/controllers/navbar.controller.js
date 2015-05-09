/**
* NavbarController
* @namespace dayjobs.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.layout.controllers')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', '$route', '$routeParams', 'Authentication', 'Facebook'];

  /**
  * @namespace NavbarController
  */
  function NavbarController($scope, $route, $routeParams, Authentication, Facebook) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;

    vm.user = undefined;
    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.facebookReady = false;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf dayjobs.layout.controllers.NavbarController
    */
    function activate() {
      if (vm.isAuthenticated) {
        vm.user = Authentication.getAuthenticatedAccount();
      }

      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal) {
            console.log('ready');
            vm.facebookReady = true;
          }
        }
      );
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf dayjobs.layout.controllers.NavbarController
    */
    function login() {
      console.log('login');
      Authentication.login();
    }

    /**
    * @name logout
    * @desc Log the user out
    * @memberOf dayjobs.layout.controllers.NavbarController
    */
    function logout() {
      Authentication.logout();
    }
  }
})();
