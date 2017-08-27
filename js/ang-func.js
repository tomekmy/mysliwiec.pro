var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);

myApp.factory('appServices', function ($timeout, $http) {
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
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
    $.each(data.menu, function (key, val) {
      $('nav ul').append('<li ng-class="{active: nav.isActive(\'/' + key + '\')}"><a href="#/' + key + '">' + val + '</a></li>');
      $('nav ul li').hover(function () {
        $(this).stop(true, false).animate({'left': '20px'}, 500);
      },
      function () {
        $(this).stop(true, false).animate({'left': '0px'}, 500, 'easeOutBounce');
      });
    });
    console.log($scope.nav);
    $scope.nav.isActive = function (path) {
      if (path === $location.path()) {
        return true;
      }
      return false;
    };
  });
});

myApp.controller('MainCtrl', function ($scope, $location, $timeout, appServices) {
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
    $('.contentWrapper__mainText').html(data.main.mainText);
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
  window.dataJSON.done(function () {
    var data = window.dataJSON.responseJSON;
    $('.contentWrapper__contactWrapper__contactDetails').html(data.contact.description);
    $('.contentWrapper__contactWrapper__your_name + label').html(data.contact.name);
    $('.contentWrapper__contactWrapper__email  + label').html(data.contact.email);
    $('.contentWrapper__contactWrapper__subject  + label').html(data.contact.subject);
    $('.contentWrapper__contactWrapper__subject').attr('placeholder', data.contact.defaultSubject);
    $('.contentWrapper__contactWrapper__message  + label').html(data.contact.message);
    $('.contentWrapper__contactWrapper__submitButton').html(data.contact.submit);
  });
});
