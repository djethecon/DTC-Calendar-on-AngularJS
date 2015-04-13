# DTC-Calendar-on-AngularJS

Simlpe Calendrier créé avec le framework AngularJS
Il s'initialise sur le mois courant.
On peut :
  -passer d'un mois à l'autre via deux boutons (flèche de droite et de gauche)
  -passer de la vue du mois  à une vue de l'année en cliquant sur le titre dans la bar du haut
  -passer de la vue de l'année à la vue du mois en cliquant sur le mois à afficher
  
![Alt text](https://raw.githubusercontent.com/djethecon/DTC-Calendar-on-AngularJS/master/dtcCalendarApp/img/screenShot-month.png)
![Alt text](https://raw.githubusercontent.com/djethecon/DTC-Calendar-on-AngularJS/master/dtcCalendarApp/img/screenshot-year.png)


#INSTALLATION :

- télécharger les fichiers .js suivant :
  - angular.min.js (https://code.angularjs.org/1.3.9/angular.min.js)
  - angular-route.min.js (https://code.angularjs.org/1.3.9/angular-route.min.js)
  - angular-animate.min.js (https://code.angularjs.org/1.3.9/angular-animate.min.js)
  - moment-with-locales.js (http://momentjs.com/downloads/moment-with-locales.js)

- ajouter au dossier 'js' du site web (créé à la racine)

- copier le dossier 'dtcCalendarApp' à la racine de votre site web
 
- ajouter à votre 'index.html' les lignes suivantes :
```html
      -<script type="text/javascript" src="js/angular.min.js"></script>
      -<script type="text/javascript" src="js/angular-route.min.js"></script>
      -<script type="text/javascript" src="js/angular-animate.min.js"></script>
      -<script type="text/javascript" src="dtcCalendarApp/js/moment-with-locales.js"></script>
      -<script type="text/javascript" src="dtcCalendarApp/js/jourFeries.js"></script>
      -<script type="text/javascript" src="dtcCalendarApp/js/dtcCalendarApp.js"></script>
      -<script type="text/javascript" src="dtcCalendarApp/directives/CalendarDirective.js"></script>
      -<script type="text/javascript" src="dtcCalendarApp/controllers/CalendarController.js"></script>
      -<script type="text/javascript" src="dtcCalendarApp/services/CalendarService.js"></script>
```
- creer un fichier app.js dans le dossier 'js' et ajouter ces lignes :
```angularjs
    (function() {
      var app = angular.module('App', ['DtcCalendarApp']);
    })();
```
- ajouter 
```html 
<html ng-app="App">
``` 
à la balise 'html' du fichier 'index.html'  -----> html ng-app="App"


#UTILISATION
 
- insérer la balise 
```html 
<dtc-calendar></dtc-calendar>
```
entre les balises 'body' 

# OPTIONNEL

Le css utilise le langage LESS.
Quelques valeurs pré-définies peuvent être modifiées dans les '.less' ou les '.css'
Il est plus pratique de les modifiées dans les '.less' mais ceux-ci doivent être re-compilé. (voir la doc sur LESS : http://lesscss.org/)
 
