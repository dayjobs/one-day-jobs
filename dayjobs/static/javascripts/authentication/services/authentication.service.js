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
      me: me,
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
      if (!localStorageService.get('user')) {
        return;
      }
      return localStorageService.get('user');
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
     * @name me
     * @desc Get the logged in user's data
     * @param {string} token The access token of the user
     * @returns Promise
     * @memberOf dayjobs.authentication.services.Authentication
     */
    function me(token) {
      return $http({method: 'GET', url: '/api/v1/me', headers: {
          'Authorization': 'Bearer facebook ' + token}
      });
    }

    /**
     * @name login
     * @desc Try to log in with facebook
     * @memberOf dayjobs.authentication.services.Authentication
     */
    function login() {
      return Facebook.login(function(response) {}).then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(data, status, headers, config) {
        localStorageService.set('token', data.authResponse.accessToken);
        me(data.authResponse.accessToken).success(
          function(data, status, headers, config) {
          // store user data
          localStorageService.set('user', data);
          window.location = '/';
        }).error(function(data, status, headers, config) {
          console.error('Did not get token');
        });
      }

      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Cannot connect to facebook!');
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
      localStorageService.remove('user');
    }

  }
})();
