(function () {
    'use strict';

    angular
        .module('LivrariaSorocaba')
        .config(ConfigProvider)
        .run(function ($rootScope, $location, $window) {
            
            $rootScope
                .$on("$stateChangeSuccess", function (event, next, current) {
                    if (!$window.ga) return;

                    var params = {
                        page: $location.path(),
                        title: $location.path().replace('/', '')
                    };

                    $window.ga('send', 'pageview', params);
                });
        });

    ConfigProvider.$inject = [
        '$stateProvider',
        '$urlRouterProvider'
    ];

    function ConfigProvider($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/books');

        $stateProvider
            .state('books', {
                url: '/books',
                views: {
                    'main': {
                        template: '<books></books>'
                    }
                }
            })
            
            .state('new', {
                url: '/edit',
                views: {
                    'main': {
                        template: '<edit></edit>'
                    }
                }
            })
            .state('edit', {
                url: '/edit/:id',
                views: {
                    'main': {
                        template: '<edit></edit>'
                    }
                }
            })
    }
})();