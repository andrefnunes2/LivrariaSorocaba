(function () {
    'use strict';
    
    angular
        .module('LivrariaSorocaba')
        .service('booksService', BooksService);

    BooksService.$inject = [
        'HTTPService',
        '$state'
    ];

    function BooksService(HTTPService, $state) {

        var vm = this;
        vm.getBooks = getBooks;
        vm.getPublishers = getPublishers;
        vm.getAuthors = getAuthors;
        vm.getCategories = getCategories;
        vm.setBook = setBook;
        vm.deleteBook = deleteBook;

        function getBooks(params) {

            var data = params ? { id: params } : "";

            return HTTPService
                .get("/Main/GetBook", data)
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    data = [];
                    return data
                })
        }

        function getPublishers() {

            return HTTPService
                .get("/Main/GetPublishers")
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    data = [];
                    return data
                })
        }

        function getAuthors() {

            return HTTPService
                .get("/Main/GetAuthors")
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    data = [];
                    return data
                })
        }

        function getCategories() {

            return HTTPService
                .get("/Main/GetCategories")
                .then(function (data) {
                    return data;
                })
                .catch(function (err) {
                    data = [];
                    return data
                })
        }

        function setBook(book) {

            return HTTPService
                .get("/Main/SetBook", book)
                .then(function (data) {
                    return true;
                });
        }

        function deleteBook(idBook) {

            var data = { idBook: idBook };

            return HTTPService
                .get("/Main/DeleteBook", data)
                .then(function (data) {
                    return true;
                });
        }
    }

})();