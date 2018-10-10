angular.module('scheduleApp', ['firebase', 'ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'mainController'
    });
    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'mainController'
    });
    $routeProvider.when('/all', {
      templateUrl: 'partials/all.html',
      controller: 'mainController'
    });
    $routeProvider.otherwise({
      redirectTo: '/login'
    });

  }])
  .factory('loginService', function () {
    var user = {};

    var service = function () {

    }
    service.login = function (_user) {
      user = _user;
    }

    service.user = function () {
      return user.name;
    }
    return service;
  })
  .controller('mainController', ['$scope', '$firebase', 'loginService', '$location', function ($scope, $firebase, loginService, $location) {

    // get # of real time users
    var listRef = new Firebase("https://deskerse.firebaseio.com/presence");
    var userRef = listRef.push();

    // Add ourselves to presence list when online.
    var presenceRef = new Firebase("https://deskerse.firebaseio.com/.info/connected");
    presenceRef.on("value", function (snap) {
      if (snap.val()) {
        userRef.set(true);
        // Remove ourselves when we disconnect.
        userRef.onDisconnect().remove();
      }
    });

    listRef.on("value", function (snap) {
      $scope.online = snap.numChildren();
    });

    // connect to firebase 
    var ref = new Firebase("https://deskerse.firebaseio.com/stuff");
    var fb = $firebase(ref);

    // sync as object 
    var syncObject = fb.$asObject();

    // three way data binding
    syncObject.$bindTo($scope, 'days');
    // function to set the default data
    $scope.book = function (slot) {
      slot.booked = true;
      slot.allocation = loginService.user();
    }
    $scope.show = function (slot, slots) {
      var bookingFound = _.find(_.flatMap(slots), function (o) {
        return o.booked && o.allocation == 'tshepo'
      });
      return (bookingFound != undefined && slot.name === bookingFound.name) || ((bookingFound == undefined) && !slot.booked);
    }

    $scope.undo = function (slot) {
      slot.booked = false;
      slot.allocation = '';
    }
    $scope.login = function (user) {
      loginService.login(user);
      $location.path('/home');
    }

    $scope.myBookings = function () {
      $location.path('/home');
    }
    $scope.allBookings = function () {
      $location.path('/all');
    }
    $scope.reset = function () {

      fb.$set({
        location: {
          midrand: {
            A: {
              name: 'Monday',
              slots: {
                A: {
                  name: 'desk 1',
                  booked: false,

                },
                B: {
                  name: 'desk 2',
                  booked: false,

                },
                C: {
                  name: 'desk 3',
                  booked: false,

                },
                D: {
                  name: 'desk 4',
                  booked: false,

                },
                E: {
                  name: 'desk 5',
                  booked: false,

                },
                F: {
                  name: 'desk 6',
                  booked: false,

                },
                G: {
                  name: 'desk 7',
                  booked: false,

                },
                H: {
                  name: 'desk 8',
                  booked: false,

                },
                I: {
                  name: 'desk 9',
                  booked: false,

                },
                J: {
                  name: 'desk 10',
                  booked: false,

                },
              }
            },
            B: {
              name: 'Tuesday',
              slots: {
                A: {
                  name: 'desk 1',
                  booked: false,

                },
                B: {
                  name: 'desk 2',
                  booked: false,

                },
                C: {
                  name: 'desk 3',
                  booked: false,

                },
                D: {
                  name: 'desk 4',
                  booked: false,

                },
                E: {
                  name: 'desk 5',
                  booked: false,

                },
                F: {
                  name: 'desk 6',
                  booked: false,

                },
                G: {
                  name: 'desk 7',
                  booked: false,

                },
                H: {
                  name: 'desk 8',
                  booked: false,

                },
                I: {
                  name: 'desk 9',
                  booked: false,

                },
                J: {
                  name: 'desk 10',
                  booked: false,

                },
              }
            },
            C: {
              name: 'Wednesday',
              slots: {
                A: {
                  name: 'desk 1',
                  booked: false,

                },
                B: {
                  name: 'desk 2',
                  booked: false,

                },
                C: {
                  name: 'desk 3',
                  booked: false,

                },
                D: {
                  name: 'desk 4',
                  booked: false,

                },
                E: {
                  name: 'desk 5',
                  booked: false,

                },
                F: {
                  name: 'desk 6',
                  booked: false,

                },
                G: {
                  name: 'desk 7',
                  booked: false,

                },
                H: {
                  name: 'desk 8',
                  booked: false,

                },
                I: {
                  name: 'desk 9',
                  booked: false,

                },
                J: {
                  name: 'desk 10',
                  booked: false,

                },
              }
            },
            D: {
              name: 'Thursday',
              slots: {
                A: {
                  name: 'desk 1',
                  booked: false,

                },
                B: {
                  name: 'desk 2',
                  booked: false,

                },
                C: {
                  name: 'desk 3',
                  booked: false,

                },
                D: {
                  name: 'desk 4',
                  booked: false,

                },
                E: {
                  name: 'desk 5',
                  booked: false,

                },
                F: {
                  name: 'desk 6',
                  booked: false,

                },
                G: {
                  name: 'desk 7',
                  booked: false,

                },
                H: {
                  name: 'desk 8',
                  booked: false,

                },
                I: {
                  name: 'desk 9',
                  booked: false,

                },
                J: {
                  name: 'desk 10',
                  booked: false,

                },
              }
            },
            E: {
              name: 'Friday',
              slots: {
                A: {
                  name: 'desk 1',
                  booked: false,

                },
                B: {
                  name: 'desk 2',
                  booked: false,

                },
                C: {
                  name: 'desk 3',
                  booked: false,

                },
                D: {
                  name: 'desk 4',
                  booked: false,

                },
                E: {
                  name: 'desk 5',
                  booked: false,

                },
                F: {
                  name: 'desk 6',
                  booked: false,

                },
                G: {
                  name: 'desk 7',
                  booked: false,

                },
                H: {
                  name: 'desk 8',
                  booked: false,

                },
                I: {
                  name: 'desk 9',
                  booked: false,

                },
                J: {
                  name: 'desk 10',
                  booked: false,

                },
              }
            }
          },
          menlyn: {
            monday: {
              name: 'Monday',
              slots: {
                A: {
                  name: 'desk 1',
                  booked: false,

                },
                B: {
                  name: 'desk 2',
                  booked: false,

                },
                C: {
                  name: 'desk 3',
                  booked: false,

                },
                D: {
                  name: 'desk 4',
                  booked: false,

                },
                E: {
                  name: 'desk 5',
                  booked: false,

                },
                F: {
                  name: 'desk 6',
                  booked: false,

                },
                G: {
                  name: 'desk 7',
                  booked: false,

                },
                H: {
                  name: 'desk 8',
                  booked: false,

                },
                I: {
                  name: 'desk 9',
                  booked: false,

                },
                J: {
                  name: 'desk 10',
                  booked: false,

                },
              }
            }
          }

        }
      });

    };

  }]);