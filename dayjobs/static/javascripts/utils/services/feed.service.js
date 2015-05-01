/**
* Feed
* @namespace dayjobs.utils.services
*/
(function () {
  'use strict';

  angular
    .module('dayjobs.utils.services')
    .factory('Feed', Feed);

  Feed.$inject = ['$http'];

  /**
  * @namespace Feed
  */
  function Feed($http) {
    /**
    * @name Feed
    * @desc The factory to be returned
    * @memberOf dayjobs.feed.services.Feed
    */
    var Feed = function(url) {
        this.items = [];
        this.busy = false;
        this.after = url ? url : 0;
    };

    Feed.prototype.nextPage = function() {
      if (this.busy || this.after == null) return;
      this.busy = true;

      $http.get(this.after).success(function(data) {
        var items = data.results;

        for (var i = 0; i < items.length; i++) {
          //add header
          if (i == 0) {
            items[i].header = true;
          }
          else {
            items[i].header = false;
          }
          this.items.push(items[i]);
        }
        this.after = data.next;
        this.busy = false;
      }.bind(this));
    };

    Feed.prototype.nextDay = function() {
      if (this.busy) return;
      this.busy = true;

      var url = "/api/v1/posts?days_ago=" + this.after;
      $http.get(url).success(function(data) {
        if (!data.length && this.after != 0) return;
        var items = data;

        for (var i = 0; i < items.length; i++) {
          //add header
          if (i == 0) {
            items[i].header = true;
          }
          else {
            items[i].header = false;
          }
          this.items.push(items[i]);
        }
        this.after++;
        this.busy = false;
      }.bind(this));
    };

    return Feed;
  }
})();
