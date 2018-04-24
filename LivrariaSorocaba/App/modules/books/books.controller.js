(function () {

    'use strict';

    angular
        .module('LivrariaSorocaba')
        .controller('booksController', booksController)
        .component('books', {
            templateUrl: 'App/modules/books/books.html',
            controller: 'booksController',
            controllerAs: 'vm'
        });

    booksController.$inject = [
        '$state',
        'booksService'
    ];

    function booksController($state, booksService) {
        var vm = this;
        vm.goNew = goNew;
        vm.goEdit = goEdit;

        init();

        function init() {
            lstBooks();
        }

        function goNew() {
            $state.go('new');
        }

        function goEdit(idBook) {
            $state.go('edit', {id: idBook});
        }

        function lstBooks() {
            $(".loading").show();
            booksService
                .getBooks()
                .then(function (data) {
                    vm.lstBooks = data;
                    $(".loading").hide();
                }, function () {
                    //Function Fail
                });
        }
    }

})();