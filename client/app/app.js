angular.module('app', ['sl.carousel'])

  .controller('AppCtrl', function AppCtrl($scope, $sce) {

    $scope.app = {};
    $scope.app.name = "Angular Carousel" 

    $scope.app.offset = 10;
    $scope.app.items = [{
      title: 'Test',
      imgSrc: 'test.png',
      description: 'This is a test'
    }, {
      title: 'Another Test',
      imgSrc: 'anothertest.png',
      description: 'One more time'
    }, {
      title: 'One More Test',
      imgSrc: 'onemoretest.png',
      description: 'Is this the last one?'
    }];

  });