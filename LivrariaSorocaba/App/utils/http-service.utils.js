(function () {

    'use strict';
    angular.module('LivrariaSorocaba').service('HTTPService', HTTPService);

    HTTPService.$inject = ['$http'];

    function HTTPService($http) {

        var debug = false;

        this.get = get;
        this.post = post;

        function get(path, params) {

            path = path + '?' + Math.round(Math.random() * 10000);

            return $http
                .get(path, {params: params})
                .then(complete)
                .catch(error);

            function complete(data, status, headers, config) {
                return data.data;
            }

            function error(message) {

                if (debug) {
                    console.log('XHR Failed: ', message);
                    console.log('Path: ', path);
                    console.log('Params: ', params);
                }

                // throw error;
                throw message;
            };

        }

        function post(path, params) {

            return $http.post(path, params)
                .then(complete)
                .catch(error);

            function complete(data, status, headers, config) {
                return data.data;
            }

            function error(message) {

                if (debug) {
                    console.log('XHR Failed: ', message);
                    console.log('Path: ', path);
                    console.log('Params: ', params);
                }

                // throw error;
                throw message;
            };

        }

    }

})();