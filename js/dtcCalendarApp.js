(function() {
    var app = angular.module("DtcCalendarApp", ['CalendarDirective', 'CalendarController', 'CalendarService', 'ngRoute', 'ngAnimate']);
    
    app.filter('capitalize', function() {
        return function(input, scope) {
            if (input!=null) {
                input = input.toLowerCase();
            }  
            return input.substring(0,1).toUpperCase()+input.substring(1);
        }
    });
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/month', {templateUrl: 'dtcCalendarApp/partials/_calendar-month.html', controller: 'CalendarMonthController as calendarMonthCtrl'})
            .when('/month/:date', {templateUrl: 'dtcCalendarApp/partials/_calendar-month.html', controller: 'CalendarMonthController as calendarMonthCtrl'})
            .when('/year', {templateUrl: 'dtcCalendarApp/partials/_calendar-year.html', controller: 'CalendarYearController as calendarYearCtrl'})
            .when('/year/:year', {templateUrl: 'dtcCalendarApp/partials/_calendar-year.html', controller: 'CalendarYearController as calendarYearCtrl'})
            .otherwise({redirectTo: '/month/'});
    }]);
    app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        var original = $location.path;
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
    }]);
})();
