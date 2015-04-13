(function() {
    var app = angular.module("CalendarDirective", []);
    
    app.directive("dtcCalendar", function() {
       return {
           restrict: 'E',
           templateUrl: 'dtcCalendarApp/partials/_dtc-calendar.html',
           scope: {},
           controller: 'MainCalendarController',
           controllerAs: 'mainCtrl'
       }; 
    });

})();
