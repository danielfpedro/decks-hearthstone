// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

prod = true;

angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services',
  'ngCordova',
  'firebase',
  'angular-storage'
])

.run(function(
  $ionicPlatform,
  $ionicModal,
  $rootScope
) {

  $rootScope.cardModal = null;
  $ionicModal.fromTemplateUrl('templates/modal/card.html', {
    scope: $rootScope
  }).then(function(modal){
    $rootScope.cardModal = modal;
  });

  $rootScope.openCardModal = function(){
    $rootScope.cardModal.show();
  }
  $rootScope.closeCardModal = function(){
    $rootScope.cardModal.hide();
  }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.decks', {
    url: '/decks',
    views: {
      'tab-decks': {
        templateUrl: 'templates/tab-decks.html',
        controller: 'DecksController'
      }
    }
  })
    .state('tab.lista-decks', {
      url: '/lista-decks',
      views: {
        'tab-decks': {
          templateUrl: 'templates/lista-decks.html',
          controller: 'ListaDecksController'
        }
      }
    })
    .state('tab.deck', {
      url: '/deck',
      views: {
        'tab-decks': {
          templateUrl: 'templates/deck.html',
          controller: 'DeckController'
        }
      }
    })

  .state('tab.stared', {
      url: '/stared',
      views: {
        'tab-stared': {
          templateUrl: 'templates/tab-stared.html',
          controller: 'StaredController'
        }
      }
    })
      .state('tab.stared-deck', {
        url: '/stared/deck',
        views: {
          'tab-stared': {
            templateUrl: 'templates/deck.html',
            controller: 'DeckController'
          }
        }
      })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountController'
      }
    },
    resolve: {
      authData: function(Login){
        return Login.authData();
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/decks');

});
