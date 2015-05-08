angular.module('dayjobs', []).filter('status', function() {
  return function(input) {
    if(input == 'W') return 'Active';
    else if(input == 'A') return 'Accepted';
    else if(input == 'P') return 'Previous';
  };
});
