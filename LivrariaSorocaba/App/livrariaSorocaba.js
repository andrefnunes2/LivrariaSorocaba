(function () {
    'use strict';

    angular.module('LivrariaSorocaba', [
        'ngRoute',
        'ngAnimate',
        'ui.router'
    ]);

})();

function getDateJson(date) {
    var data = new Date(date.match(/\d+/) * 1);
    return data.getFullYear() + '-' + pad(data.getMonth() + 1, 2) + '-' + pad(data.getDate(),2);
}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}

function convertToJSONDate(strDate) {
    var splitted = strDate.split('-');
    var newDate = new Date(Date.UTC(splitted[0], splitted[2], splitted[1]));
    return '/Date(' + newDate.getTime() + ')/';
}

function getDateToday() {
    var today = new Date();
    return today.getFullYear() + '-' + pad(today.getMonth() + 1, 2) + '-' + pad(today.getDate(), 2);
}