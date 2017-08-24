var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);

myApp.factory('appServices', function ($timeout) {
  return {
    mainLag: function () {
      if ($('.contentWrapper__mainText span').length > 115) {
        $('.contentWrapper__mainText span:last').remove();
        $('body').css('overflow', 'hidden');
        var mainTimer = $timeout(function () {
          $('body').css('overflow', 'visible');
        }, 5700);
        console.log('Enter from Main. Timeout ID: ' + mainTimer.$$timeoutId);
        return mainTimer;
      }
    },
    footerPosition: function () {
      var footerPos = 0;
      if ($(document).height() > $(window).height()) {
        footerPos = $(window).height() - $(document).height() - 80;
      }
      $('footer').css('bottom', footerPos + 'px');
    }
  };
});

myApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/main', {
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'AboutCtrl',
      resolve: {
        lag: function (appServices) {
          return appServices.mainLag();
        }
      }
    })
    .when('/portfolio', {
      templateUrl: 'partials/portfolio.html',
      controller: 'PortfolioCtrl',
      resolve: {
        lag: function (appServices) {
          return appServices.mainLag();
        }
      }
    })
    .when('/blog', {
      templateUrl: 'partials/blog.html',
      controller: 'BlogCtrl',
      resolve: {
        lag: function (appServices) {
          return appServices.mainLag();
        }
      }
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'ContactCtrl',
      resolve: {
        lag: function (appServices) {
          return appServices.mainLag();
        }
      }
    })
    .otherwise({
      redirectTo: '/main'
    });

  //        $locationProvider.html5Mode(true).hashPrefix('*');
});

myApp.controller('NavCtrl', function ($scope, $location) {
  $scope.nav = {};
  $scope.nav.isActive = function (path) {
    if (path === $location.path()) {
      return true;
    }
    return false;
  };
});

myApp.controller('MainCtrl', function ($scope, $location, $timeout, appServices) {
  // $('.contentWrapper__mainText').html($scope.dataJSON.main.mainText);
  $('.contentWrapper__mainText p:eq(0)').show().textillate({ in: {
    effect: 'bounceIn',
    delay: 40
  },
  out: {
    effect: 'hinge',
    delay: 70,
    shuffle: true,
    sync: false,
    delayScale: 7
  }
  });
  var timer1 = $timeout(function () {
    $('.contentWrapper__mainText p:eq(1)').show().textillate({ in: {
      effect: 'bounceIn',
      delay: 40
    },
    out: {
      effect: 'hinge',
      delay: 40,
      shuffle: true,
      sync: false,
      delayScale: 2
    }
    });
  }, 500);
  var timer2 = $timeout(function () {
    $('.contentWrapper__mainText p:eq(2)').show().textillate({ in: {
      effect: 'bounceIn',
      delay: 40,
      callback: function () {
        $('.contentWrapper__mainText p:eq(2)').append('<span></span>');
      }
    },
    out: {
      effect: 'hinge',
      delay: 40,
      shuffle: true,
      sync: false,
      delayScale: 2
    }
    });
  }, 3100);

  appServices.footerPosition();

  $scope.$on('$routeChangeStart', function (next, current) {
    $timeout.cancel(timer1);
    $timeout.cancel(timer2);
    $('.contentWrapper__mainText p').textillate('stop');
    if ($('.contentWrapper__mainText span').length > 115) {
      $('.contentWrapper__mainText p').textillate('out');
    }
  });
});

myApp.controller('AboutCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});

myApp.controller('PortfolioCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});

myApp.controller('BlogCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});

myApp.controller('ContactCtrl', function ($scope, $location, appServices) {
  appServices.footerPosition();
});
