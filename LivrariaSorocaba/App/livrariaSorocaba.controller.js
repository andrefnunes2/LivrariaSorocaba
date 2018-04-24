(function () {
    'use strict';

    angular
        .module('LivrariaSorocaba')
        .controller('LivrariaSorocabaController', LivrariaSorocabaController);

    LivrariaSorocabaController.$inject = [
        '$state'
    ];

    function LivrariaSorocabaController($state) {

        var vm = this;
        
        init();

        function init() {
            
        }
    }
})();