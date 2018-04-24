(function () {

    'use strict';

    angular
        .module('LivrariaSorocaba')
        .controller('editController', editBookController)
        .component('edit', {
            templateUrl: 'App/modules/edit/edit.html',
            controller: 'editController',
            controllerAs: 'vm'
        });

    editBookController.$inject = [
        '$state',
        'booksService'
    ];

    function editBookController($state, booksService) {
        var vm = this;
        vm.goBack = goBack;
        vm.goSave = goSave;
        vm.goDelete = goDelete;
        vm.toggleSelection = toggleSelection;
        
        init();

        function init() {
            getPublishers();
            getAuthors();
            getCategories();
            
            if ($state.params.id)
                getBook($state.params.id);
        }

        function getBook(id) {
            $(".loading").show();
            booksService
                .getBooks(id)
                .then(function (data) {
                    vm.book = data;
                    vm.book.ReleaseDay = vm.book.ReleaseDay != null ? getDateJson(vm.book.ReleaseDay) : getDateToday();
                    $(".loading").hide();
                }, function () {
                    //Function Fail
                });
        }

        function goBack() {
            $state.go('books');
        }

        function goSave() {

            vm.errors = [];

            $("input,select").parent().removeClass("has-error");
            $("input,select").filter('[required]:visible').each(function () {
                if (!$(this).val()) {
                    $(this).parent().addClass("has-error");
                    vm.errors.push({ txt: "• Campo '" + $(this).parent().find("label").html().replace(':', '') + "' é obrigatório." });
                }
            });

            if (vm.errors.length == 0) {

                $(".loading").show();

                if (vm.PublisherSelect)
                    vm.book.IDPublisher = parseInt(vm.PublisherSelect);

                vm.book.ReleaseDay = new Date(vm.ReleaseDay ? vm.ReleaseDay : vm.book.ReleaseDay).toJSON();

                booksService
                    .setBook(vm.book)
                    .then(function () {
                        $(".loading").hide();
                        $state.go('books');
                    });
            }
        }

        function goDelete() {
            $(".loading").show();
            booksService
                .deleteBook(vm.book.ID)
                .then(function () {
                    $(".loading").hide();
                    $state.go('books');
                });
        }

        function getPublishers() {
            $(".loading").show();
            booksService
                .getPublishers()
                .then(function (data) {
                    $(".loading").hide();
                    vm.Publishers = data;
                }, function () {
                    //Function Fail
                });
        }

        function getAuthors() {
            $(".loading").show();
            booksService
                .getAuthors()
                .then(function (data) {
                    $(".loading").hide();
                    vm.Authors = data;
                }, function () {
                    //Function Fail
                });
        }

        function getCategories() {
            $(".loading").show();
            booksService
                .getCategories()
                .then(function (data) {
                    $(".loading").hide();
                    vm.Categories = data;
                }, function () {
                    //Function Fail
                });
        }

        function toggleSelection(obj, list) {
            var idx = list.indexOf(obj);
            
            if (idx > -1) list.splice(idx, 1);
            else list.push(obj);
        }
    }

})();