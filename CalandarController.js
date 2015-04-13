(function() {
    var app = angular.module("CalendarController", []);

    app.controller("MainCalendarController", ['$location', '$scope', '$routeParams', 'CalendarService', function($location, $scope, $routeParams, CalendarService){
        var that = this;
    //initialisation de la zoneTime à 'fr'
        moment.locale('fr');

    //variable pour détecter le sens de l'animation
        $scope.ui = {
            direction: ''
        };

    /**************** INITIALISATION AU DEMARRAGE DE L4AP *****************************/
    //initialisation du format du paramètre d'adressage à 'MM-YYYY'
        CalendarService.setFormat("MM-YYYY");
        this.format = CalendarService.getFormat();

    //initialisation du type d'adresse à 'month' (http://.../month/param)
        var path = moment().format(this.format);
        $location.path('month/'+path);
        var splitPath = $location.path().split('/');
        CalendarService.setType(splitPath[1]);//setter type à 'month' 
        this.type = CalendarService.getType();

    //initialisation de la date suivant et précédente à afficher    
        this.nextDate = CalendarService.getNextDate();
        this.previousDate = CalendarService.getPreviousDate();

        $scope.$on("$locationChangeStart", function(event, next, current) {
            var splitPath = $location.path().split('/');
            CalendarService.setType(splitPath[1]);
            that.type = CalendarService.getType();
            if (that.type === 'month') {
                CalendarService.setFormat("MM-YYYY");
                that.format = CalendarService.getFormat();
            //récupération de la date dans l'url
            //si celle-ci est invalide
            //'fade' comme effet d'animation
                var param = $routeParams.date;
                var temp = moment(param, that.format, 'fr', true);
                if (!temp.isValid()) {
                    $scope.ui.direction = 'fade';
                }
            }
            else {
                CalendarService.setFormat("YYYY");
                that.format = CalendarService.getFormat();
                var param = $routeParams.year;
                var temp = moment(param, that.format, 'fr', true);
                if (!temp.isValid()) {
                    $scope.ui.direction = 'fade';
                }
            }

        });


    //fonction : passage au mois suivant
        this.nextMonth = function() {
            if (CalendarService.getType() === 'month') {
                $scope.ui.direction = 'right';//changement de la direction de l'annimation
                var temp = moment($routeParams.date, that.format, 'fr', true);//récupeération de la date en paramètre de l'url
                CalendarService.setNextDate(temp.add(1,'month'));
                that.nextDate = CalendarService.getNextDate();//initialisation de la prochaine date en ajoutant 1 mois
            }
            else {
                $scope.ui.direction = 'right';//changement de la direction de l'annimation
                var temp = moment($routeParams.year, that.format, 'fr', true);//récupeération de la date en paramètre de l'url
                CalendarService.setNextDate(temp.add(1,'year'));
                that.nextDate = CalendarService.getNextDate();//initialisation de la prochaine date en ajoutant 1 mois
            }
        };
     //fonction : passage au mois précédent   
        this.previousMonth = function() {
            if (CalendarService.getType() === 'month') {
                $scope.ui.direction = 'left';//changement de la direction de l'annimation
                var temp = moment($routeParams.date, that.format, 'fr', true);//récupeération de la date en paramètre de l'url
                CalendarService.setPreviousDate(temp.subtract(1,'month'));
                that.previousDate = CalendarService.getPreviousDate();//initialisation de la prochaine date en enlevant 1 mois
            }
            else {
                $scope.ui.direction = 'left';//changement de la direction de l'annimation
                var temp = moment($routeParams.year, that.format, 'fr', true);//récupeération de la date en paramètre de l'url
                CalendarService.setPreviousDate(temp.subtract(1,'year'));
                that.previousDate = CalendarService.getPreviousDate();//initialisation de la prochaine date en enlevant 1 mois
            }
        };
    }]);

    app.controller("CalendarMonthController",['$location', '$routeParams', '$scope', "CalendarService", function($location, $routeParams, $scope, CalendarService) {
        var that = this;
    //initialisation du nom des jours de la semaine dans un tableau 'daysName'
        this.daysName = CalendarService.getDaysName().then(function(data) {
            that.daysName = data;
        }, function(msg) {
            alert(msg);
        });

    //initialisation de la variable de type et format d'affichage 'month ou year'
        CalendarService.setType('month');
        CalendarService.setFormat("MM-YYYY");

    //récupération du paramètre de l'url
        var param = $routeParams.date;
    //initialisation du mois affiché avec le paramètre de l'url 'param'
        this.date = moment(param,CalendarService.getFormat(), 'fr', true);

        $scope.$on("$routeChangeSuccess", function(event, next, current) {
            if (CalendarService.getType() === 'month') {
                var param = $routeParams.date;
                var temp = moment(param, CalendarService.getFormat(), 'fr', true);
                if (temp.isValid()) {
                    that.dateTitle = temp;
                    that.weeks = CalendarService.buildMonth(that.date);
                }
                else {
                    that.weeks = CalendarService.buildMonth(moment());
                    var path = moment().format(CalendarService.getFormat());
                    $location.path("/month/"+path, false);
                    that.dateTitle = moment();
                    $routeParams.date = path;
                    this.date = moment($routeParams.date,CalendarService.getFormat(), 'fr', true);
                } 
            }
        });

    //passe à l'affichage de l'année en paramètre
        this.yearDisplay = function(date) {
            date = date.format("YYYY");
            $location.path('year/'+date, true);
        };
    }]);

    app.controller("CalendarYearController",['$location', '$routeParams', '$scope', 'CalendarService', function($location, $routeParams, $scope, CalendarService) {
    var that = this;

//récupération du paramètre de l'url
    var param = $routeParams.year;
//initialisation du type et format d'affichange 'year'
    CalendarService.setType('year');
    var tempNextDate = CalendarService.getNextDate();
    CalendarService.setNextDate(tempNextDate.add(1,'year'));
    var tempPreviousDate = CalendarService.getPreviousDate();
    CalendarService.setPreviousDate(tempPreviousDate.subtract(1,'year'));
    CalendarService.setFormat("YYYY");
//initialisation du mois affiché avec le paramètre de l'url 'param'
    this.date = moment(param,CalendarService.getFormat(), 'fr', true);

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        var temp;
        var path;
        var param;
        if (CalendarService.getType() === 'year') {
            param = $routeParams.year;
            temp = moment(param, CalendarService.getFormat(), 'fr', true);
            if (temp.isValid()) {
                that.dateTitle = temp;
                that.year = CalendarService.buildYear(that.date);
            }
            else {
                temp = moment().startOf('year');
                var tempCopy = temp.clone();
                that.year = CalendarService.buildYear(tempCopy);
                path = temp.format(CalendarService.getFormat());
                console.log(temp);
                $location.path("/year/"+path, false);
                that.dateTitle = temp;
                console.log(temp);
                $routeParams.year = path;
                that.date = moment($routeParams.year,CalendarService.getFormat(), 'fr', true);
            }
        }
    });

//passe à l'affichage du mois en paramètre
    this.monthDisplay = function(month, year) {
        year = year.format("YYYY");
        var date = moment(month+'-'+year,"MMMM-YYYY");
        console.log(date);
        date = date.format("MM-YYYY");
        console.log(date);
        $location.path('month/'+date, true);
    };
}]); 
})();
