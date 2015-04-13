(function() {
    var app = angular.module("CalendarService", []);

    app.service("CalendarService", ['$http', '$q', function( $http, $q) {
        var that = this;

        this.type = '';
        this.setType = function(param) {
            that.type = param;
        }
        this.getType = function() {
            return that.type;
        };

        this.format = '';
        this.setFormat = function(param) {
            that.format = param;
        };
        this.getFormat = function() {
            return that.format;
        };

        this.nextDate = moment().add(1,'month');
        this.setNextDate = function(param) {
            that.nextDate = param;
        };
        this.getNextDate = function() {
            return that.nextDate;
        };

        this.previousDate = moment().subtract(1,'month');
        this.setPreviousDate = function(param) {
            that.previousDate = param;
        };
        this.getPreviousDate = function() {
            return that.previousDate;
        };

        this.daysName = [];
        this.getDaysName = function() {
            var deferred = $q.defer();
            $http.get('dtcCalendarApp/json/daysName.json')
                .success(function(data, status) {
                    that.daysName = data;
                    deferred.resolve(that.daysName);
                })
                .error(function(data, status) {
                    deferred.reject("Erreur lors du chargement des données");
            });
            return deferred.promise;
        };
    
        /*
            recherche le jour le premier lundi avant le 1er du mois courant
            @moment : date actuelle
        */
        this.findFirstMonday = function(moment) {
            var daysOfWeek = moment.weekday();// get le jour de la semaine du 1er du mois
            moment = moment.clone(); // copie du moment avant changement
            moment.subtract(daysOfWeek, 'days'); // get le 1er lundi avant
            return moment;
        }

        /*
            construit une semaine entière
            @moment : date de début de construction
            @currentMonth : date actuelle
            ->days : semaine construite
        */
        this.buildWeek = function(moment, currentMonth, numW) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                days.push({
                    indexD : i,
                    indexW : numW,
                    indexM : moment.month(),
                    name : moment.format("ddd"),
                    date : moment.date(),
                    month : moment.format("MMMM"),
                    year : moment.year(),
                    isCurrentMonth : moment.month() === currentMonth.month(),
                    isToday : moment.isSame(new Date(), 'days'),
                    isFerie : isFerie(moment),
                    type : "none"
                });
                moment.add(1, 'days');
            }
            return days;
        }

        /*
            construit le mois courant
            @moment : date actuelle
        */
        this.buildMonth = function(moment) {
            var weeks = [];
            moment.startOf('month'); // set moment au début du mois courant 
            var startWeek = that.findFirstMonday(moment);
            for (var i = 0; i < 6; i++) {
                weeks.push({
                    name: moment.format("MMMM"),
                    semaine: that.buildWeek(startWeek, moment, i)
                });
            }
            return weeks;
        }

        /*
            construit un trimestre
            @moment : date actuelle
        */
        this.buildTrimestre = function(moment) {
            var trimestre = [];
            for (var i = 0; i < 3; i++) {
                trimestre.push({
                    name: moment.format("MMMM"),
                    weeks: that.buildMonth(moment)
                });
                moment.add(1,"months");
            } 
            return trimestre;
        }

        /*
            construit une année
            @moment : date actuelle
        */
        this.buildYear = function(moment) {
            var year = [];
            for (var i = 0; i < 4; i++) {
                year.push({
                    name: moment.format("MMMM"),
                    trimestres : that.buildTrimestre(moment) 
                });
            } 
            return year;
        }
    }]);
})();
