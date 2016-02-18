angular.module('starter.controllers', [])

.directive('compileHtml', function($compile) {
  return {
    link: function (scope, element, attrs) {
        scope.$watch(function () {
            return scope.$eval(attrs.compileHtml);
        }, function (value) {
            element.html(value);
            $compile(element.contents())(scope);
        });
    }
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
.controller('DecksController', function($scope) {
  $scope.heroes = [
    {
      name: 'Rogue'
    },
    {
      name: 'Warrior'
    }
  ]
})
.controller('ListaDecksController', function(
  $scope,
  $cordovaToast,
  $ionicListDelegate
) {
  $scope.decks = {
    'Meta': [
      {
        name: 'Oil'
      },
      {
        name: 'Raptor'
      },
    ],
    'Básicos': [
      {
        name: 'Básico'
      }
    ]
  };
  $scope.addStar = function(){
    console.log('Estrela inserida');
    $cordovaToast.show('Inserido aos favoritos', 'short', 'bottom');
    $ionicListDelegate.closeOptionButtons()
  }
})
.controller('DeckController', function(
  $scope,
  $ionicModal
) {
  $scope.deck = {
    name: 'Oil',
    desc: {
      'Muligan': 'Bla bla bla.',
      'Combo': 'Bla bla bla <span ng-click="openCardModal()">Leeroy Jenkins</span> bla bla bla.'
    }
  };

  $scope.list = [
    {name: 'Mutaliska'},
    {name: 'Leeroy'}
  ];

  $ionicModal.fromTemplateUrl('templates/modal/list.html', {
    scope: $scope
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.openModal = function(){
    $scope.modal.show();
  };
  $scope.closeModal = function(){
    $scope.modal.hide();
  };

})
.controller('AccountController', function(
  $scope,
  Login,
  authData
) {
  $scope.authData = authData;
  console.log(authData);
  $scope.doLogin = function(){
    if (prod) {
        Login.doLoginNative();
    } else {
        Login.doLoginWeb();
    }
  }
})
.controller('StaredController', function($scope) {
  $scope.decks = {
    'Meta': [
      {
        name: 'Oil'
      },
      {
        name: 'Raptor'
      },
    ],
    'Básicos': [
      {
        name: 'Básico'
      }
    ]
  };
});
