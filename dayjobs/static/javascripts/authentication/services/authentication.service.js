/**
* Authentication
* @namespace dayjobs.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.authentication.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http', 'Facebook', 'localStorageService'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http, Facebook, localStorageService) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout,
      unauthenticate: unauthenticate
    };

    return Authentication;

    ////////////////////

    /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf dayjobs.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$localStorageService.get('token')) {
        return;
      }

      return JSON.parse(localStorageService.get('token'));
    }

    /**
     * @name isAuthenticated
     * @desc Check if the current user is authenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf dayjobs.authentication.services.Authentication
     */
    function isAuthenticated() {
      return !!localStorageService.get('token');
    }

    /**
     * @name login
     * @desc Try to log in with email `email` and password `password`
     * @param {string} email The email entered by the user
     * @param {string} password The password entered by the user
     * @returns {Promise}
     * @memberOf dayjobs.authentication.services.Authentication
     */
    function login() {
      console.log('start');
      return Facebook.login(function(response) {}).then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(data, status, headers, config) {
        console.log('yes');
        $http({method: 'GET', url: '/auth/convert-token', headers: {
            'Authorization': 'Bearer facebook ' + data.authResponse.accessToken}
        }).success(function(data, status, headers, config) {
          console.log('yes 2');
          console.log(data);
          localStorageService.set('token', data);
        }).error(function(data, status, headers, config) {
          console.error('Did not covert token!');
        });
        window.location = '/';
      }

      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }

    /**
     * @name logout
     * @desc Try to log the user out
     * @returns {Promise}
     * @memberOf dayjobs.authentication.services.Authentication
     */
    function logout() {
      Authentication.unauthenticate();

      window.location = '/';
    }

    /**
     * @name unauthenticate
     * @desc Delete the cookie where the user object is stored
     * @returns {undefined}
     * @memberOf dayjobs.authentication.services.Authentication
     */
    function unauthenticate() {
      localStorageService.remove('token');
    }

  }
})();
