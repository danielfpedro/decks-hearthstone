angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('FirebaseRef', function() {
    return new Firebase('https://minha-lista.firebaseio.com');
})
.factory('Auth', function(
    FirebaseRef,
    $firebaseAuth
) {
    return $firebaseAuth(FirebaseRef);
})
.factory('Login', function(
    $q,
    $state,
    $firebaseAuth,
    FirebaseRef,
    Auth
) {
    return {
        authData: function(){
            var defer = $q.defer();
            Auth.$onAuth(function(authData){
                defer.resolve(authData);
            });
            return defer.promise;
        },
        doLoginWeb: function(){
            var defer = $q.defer();

            var refAuth = $firebaseAuth(FirebaseRef);

                refAuth.$authWithOAuthPopup("facebook").then(function(authData) {
                    defer.resolve();
                }).catch(function(error) {
                    defer.reject(error);
                });

                return defer.promise;
        },
        doLoginNative: function(){
            var defer = $q.defer();

            this.getAccessToken()
                .then(function(token){
                    var ref = FirebaseRef;
                    ref.authWithOAuthToken("facebook", token, function(error, authData) {
                        if (error) {
                            defer.reject(error);
                        } else {
                            defer.resolve();
                        }
                    });
                    
                }, function(error){
                    defer.reject(error);
                });
            return defer.promise;
        },
        getAccessToken: function() {
            var defer = $q.defer();
            var fbLoginSuccess = function (userData) {
                facebookConnectPlugin.getAccessToken(function(token) {
                    defer.resolve(token)
                });
            }

            facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
                function (error) {
                    defer.reject();
                }
            );

            return defer.promise;
        }
    }
});