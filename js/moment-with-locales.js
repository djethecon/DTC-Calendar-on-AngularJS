'use strict';

/*
    Jour de l'an	
    Fête du Travail	
    8 Mai 1945
    Fête Nationale
    Noël
    Assomption
    La Toussaint
    Armistice
    Lundi de Pâques	
    Jeudi de l'Ascension
    Lundi de Pentecôte
    
*/

/* 
    définit si la date en paramètre est le jour de l'an (01 janvier)
*/
function isJourAn(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 1 && mois === 0) return true;
    else return false;
}

/* 
    définit si la date en paramètre est la fête du travail (01 mai) 
*/
function isJourFeteTravail(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 1 && mois === 4) return true;
    else return false;
}

/* 
    définit si la date en paramètre est le 8 mai (08 mai) 
*/
function isJourHuitMai(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 8 && mois === 4) return true;
    else return false;
}

/* 
    définit si la date en paramètre est la fête nationale (14 juillet) 
*/
function isJourFeteNationale(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 14 && mois === 6) return true;
    else return false;
}

/* 
    définit si la date en paramètre est noël (25 décembre) 
*/
function isJourNoel(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 25 && mois === 11) return true;
    else return false;
}

/* 
    définit si la date en paramètre est l'assomption (15 août) 
*/
function isJourAssomption(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 15 && mois === 7) return true;
    else return false;
}

/* 
    définit si la date en paramètre est la toussaint (1 novembre) 
*/
function isJourToussaint(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 1 && mois === 10) return true;
    else return false;
}

/* 
    définit si la date en paramètre est l'armistice (11 novembre) 
*/
function isJourArmistice(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    
    if (jour === 11 && mois === 10) return true;
    else return false;
}

/* 
    définit le jour de paques en fonction de l'annee passé en paramètre 
*/
function jourPaques(Y) {
    
    var a = Y % 19;
    var b = Math.floor(Y / 100);
    var c = Y % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var n0 = (h + l + 7 * m + 114);
    var n = Math.floor(n0 / 31) - 1;
    var p = n0 % 31 + 1;
    var date = new Date(Y, n, p);
    
    return moment(date);
}

/* 
    définit si la date en paramètre est le jour de paques 
*/
function isJourPaques(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    var jourPaques = jourPaques(annee);
    
    if (jourPaques.isSame(date)) return true;
    else return false;
}

/* 
    définit le lundi de paques en fonction de l'annee passé en paramètre 
*/
function lundiPaques(Y) {
    
    var jPaques = jourPaques(Y);
    
    return jPaques.add(1, "days");
}

/* 
    définit si la date en paramètre est le lundi de paques 
*/
function isLundiPaques(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    var lundiP = lundiPaques(annee);
    
    if (lundiP.isSame(date)) return true;
    else return false;
}


/* 
    définit le jour de l'ascension en fonction de l'annee passé en paramètre 
*/
function ascension(Y) {
    var jPaques = jourPaques(Y);
    
    return jPaques.add(39, "days");
}

/* 
    définit si la date en paramètre est l'ascension
*/
function isJourAscenstion(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    var ascensionDay = ascension(annee);
    
    if (ascensionDay.isSame(date)) return true;
    else return false;
}

/* 
    définit le jour de la pentecôte en fonction de l'annee passé en paramètre  
*/
function pentecote(Y) {
    var jPaques = jourPaques(Y);
    
    return jPaques.add(50, "days");
}

/* 
    définit si la date en paramètre est la pentecôte 
*/
function isJourPentecote(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    var pentecoteDay = pentecote(annee);
    
    if (pentecoteDay.isSame(date)) return true;
    else return false;
}

/* 
    définit si la date en paramètre est un jour férié français
*/
function isFerie(date) {
    var jour = date.date();
    var mois = date.month();
    var annee = date.year();
    if (isJourAn(date) ||
        isJourArmistice(date) ||
        isJourAscenstion(date) ||
        isJourAssomption(date) ||
        isJourFeteNationale(date) ||
        isJourFeteTravail(date) ||
        isJourHuitMai(date) ||
        isJourNoel(date) ||
        isJourPentecote(date) ||
        isJourToussaint(date) ||
        isLundiPaques(date)) return true;
    else return false;
}

