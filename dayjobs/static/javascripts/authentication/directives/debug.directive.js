/**
* Post
* @namespace dayjobs.authentication.directives
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.authentication.directives')
    .directive('debug', debug);

  /**
  * @namespace Debug
  */
  function debug() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf dayjobs.authentication.directives.Debug
    */
    var directive = {
      restrict: 'E',
      scope: {
        expression: '=val'
      },
      template: '<pre>{{debug(expression)}}</pre>',
      link: function(scope) {
        // pretty-prints
        scope.debug = function(exp) {
          return angular.toJson(exp, true);
        };
      }
    };

    return directive;
  }
})();
