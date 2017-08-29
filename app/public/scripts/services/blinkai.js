'use strict';
    app.service('blinkaiService', [
        '$q',
        '$http',
        'localStorageService',
        function ($q, $http, localStorageService,config) {
            this.login = function (params) {
                var deferred = $q.defer();
                  //console.log(params);
                $http.post(config.blinkai + 'session', params).then(function (res) {
                  if (res.data.success == false) {
                    return deferred.reject(res.data.error);
                  }

                  localStorageService.set('privateToken', res.data.data.privateToken);
                  localStorageService.set('username', res.data.data.username);
                  localStorageService.set('avatar', res.data.data.avatar_url);
                  deferred.resolve(res.data);
                }, deferred.reject);

                return deferred.promise;
            };

            this.me = function () {
                var deferred = $q.defer(),
                    options = {
                        url: config.blinkai + 'user',
                        headers: {
                            'PRIVATE-TOKEN': localStorageService.get('privateToken')
                        },
                        method: 'get'
                    };


                $http(options).then(function (res) {
                    deferred.resolve(res.data);
                }, deferred.reject);

                return deferred.promise;
            };

            this.getStores = function (url) {
                url = url || config.blinkai + 'stores';
                //console.log(url);
                var deferred = $q.defer(),
                    options = {
                        url: url,
                        headers: {
                            'PRIVATE-TOKEN': localStorageService.get('privateToken')
                        },
                        method: 'get'
                    };

                $http(options).then(function (res) {console.log(res.data);
                    deferred.resolve({
                        entries: res.data
                    });
                }, deferred.reject);

                return deferred.promise;
            };

            this.getActivities = function (store_id) {
                var url = config.blinkai + 'stores/' + store_id + '/activities';
                //console.log(url);
                var deferred = $q.defer(),
                    options = {
                        url: url,
                        headers: {
                            'PRIVATE-TOKEN': localStorageService.get('privateToken')
                        },
                        method: 'get'
                    };

                $http(options).then(function (res) {
                    deferred.resolve({
                        entries: res.data
                    });
                }, deferred.reject);

                return deferred.promise;
            };


        this.getconversationDetail=function(store_id,id){
          var url = config.blinkai + 'stores/' + store_id + '/conversations/'+ id;
            var deferred = $q.defer(),
            options = {
                url: url,
                headers: {
                    'PRIVATE-TOKEN': localStorageService.get('privateToken')
                },
                method: 'get'
            };
            $http(options).then(function (res) {
              //console.log(res.data);
                deferred.resolve({'entries':res.data});

            }, deferred.reject);

            return deferred.promise;
        }

        this.getStoreDetail= function(store_id){
            var url = config.blinkai + 'stores/' + store_id + '/conversations';
            //console.log(url);
              var deferred = $q.defer(),
              options = {
                  url: url,
                  headers: {
                      'PRIVATE-TOKEN': localStorageService.get('privateToken')
                  },
                  method: 'get'
              };

              $http(options).then(function (res) {
                //console.log(res.data);
                  deferred.resolve({'entries':res.data});

              }, deferred.reject);

              return deferred.promise;
            };

            this.logout = function () {
                localStorageService.remove('privateToken');
                localStorageService.remove('username');
                localStorageService.remove('avatar');
            };
        }
    ]);

