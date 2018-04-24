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
            else
                startObjBook();
        }

        function getBook(id) {
            $(".loading").stop().fadeIn(200);
            booksService
                .getBooks(id)
                .then(function (data) {
                    vm.book = data;
                    vm.book.ReleaseDay = vm.book.ReleaseDay != null ? getDateJson(vm.book.ReleaseDay) : getDateToday();
                    $(".loading").stop().fadeOut(400);
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
                if (!$(this).val() || $(this).val() == '? undefined:undefined ?') {
                    $(this).parent().addClass("has-error");
                    vm.errors.push({ txt: "• Campo '" + $(this).parent().find("label").html().replace(':', '') + "' é obrigatório." });
                }
            });

            if (vm.errors.length == 0) {

                $(".loading").stop().fadeIn(200);

                if (vm.PublisherSelect)
                    vm.book.IDPublisher = parseInt(vm.PublisherSelect);

                vm.book.ReleaseDay = new Date(vm.ReleaseDay ? vm.ReleaseDay 
                    : (vm.book.ReleaseDay ? vm.book.ReleaseDay
                        : getDateToday())).toJSON();

                booksService
                    .setBook(vm.book)
                    .then(function () {
                        $(".loading").stop().fadeOut(400);
                        $state.go('books');
                    });
            }
        }

        function goDelete() {
            $(".loading").stop().fadeIn(200);
            booksService
                .deleteBook(vm.book.ID)
                .then(function () {
                    $(".loading").stop().fadeOut(400);
                    $state.go('books');
                });
        }

        function getPublishers() {
            $(".loading").stop().fadeIn(200);
            booksService
                .getPublishers()
                .then(function (data) {
                    $(".loading").stop().fadeOut(400);
                    vm.Publishers = data;
                }, function () {
                    //Function Fail
                });
        }

        function getAuthors() {
            $(".loading").stop().fadeIn(200);
            booksService
                .getAuthors()
                .then(function (data) {
                    $(".loading").stop().fadeOut(400);
                    vm.Authors = data;
                }, function () {
                    //Function Fail
                });
        }

        function getCategories() {
            $(".loading").stop().fadeIn(200);
            booksService
                .getCategories()
                .then(function (data) {
                    $(".loading").stop().fadeOut(400);
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

        function startObjBook() {
            vm.book = {
                ID: 0,
                IDPublisher: 0,
                Active: true,
                Authors :[],
                Categories:[],
                Description:"",
                ReleaseDay:null,
                Title:"",
                Units:null
            }
        }
    }

})();