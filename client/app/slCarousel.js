angular.module('sl.carousel', ['ngSanitize'])
  
  .directive('slCarousel', function() {
    return {
      restrict: 'A',
      replace: false,
      controller: 'slCarouselCtrl',
      scope: {
        slCarouselItems: '=',
        slCarouselItemOffset: '='
      },

      template: 
        '<div class="sl-carousel-container clearfix">' +

          '<div class="viewport">' +

            '<div ng-repeat="item in slCarouselItems"> ' +
              '<div' +  
                ' sl-carousel-item' +
                ' sl-carousel-item-img-src="item.imgSrc"' +
                ' sl-carousel-item-title="item.title" ' +
                ' sl-carousel-item-description="item.description">' +
              '</div>' +
            '</div>' + 

        '</div>',

      link: function($scope, $element, $attrs, slCarouselCtrl) {
        slCarouselCtrl.setViewportWidth($element.find('.viewport').width());
      }
    }  
  })

  .directive('slCarouselItem', function() {
    return {
      restrict: 'A',
      replace: true,
      require: '^slCarousel',
      scope: {
        imgSrc: '=slCarouselItemImgSrc',
        title: '=slCarouselItemTitle',
        description: '=slCarouselItemDescription' 
      },

      template: 
        '<div class="item-wrapper">' +

          /* img */
          '<div class="item-img-wrapper">' +
            '<img ng-src="{{imgSrc}}" />' +
          '</div>' +

          /* title */
          '<h3 class="item-title">{{title}}</h3>' +

          /* description */
          '<p class="item-description">{{description}}</p>' +
        '</div>',

      link: function($scope, $element, $attrs, slCarouselCtrl) {

        $scope.addNextListener = function(){
          var $el = this._$el;
          $el.on('click.slcarousel', function() {
            slCarouselCtrl.next();
          });
          $el.addClass('control next');
        }

        $scope.removeNextListener = function() {
          var $el = this._$el;
          $el.off('click.slcarousel');
          $el.removeClass('control next');
        }

        $scope.addPreviousListener = function() {
          var $el = this._$el;
          $el.on('click.slcarousel', function() {
            slCarouselCtrl.previous();
          });
          $el.addClass('control previous');
        }

        $scope.removePreviousListener = function() {
          var $el = this._$el;
          $el.off('click.slcarousel');
          $el.removeClass('control previous');
        }

        $scope.reset = function() {
          this.removeNextListener();
          this.removePreviousListener();           
        }

        slCarouselCtrl.addSlide($scope, $element); 
      }
    } 
  })

  .controller('slCarouselCtrl', function($scope, $timeout, $q) {
    var self = this,
        slides = self.slides || [],
        currentIndex = 0,

        currentTimeout;

    self.currentSlide = null;

    function _width($el) {
      var width = parseInt($el.width(), 10),
          paddingLeft = parseInt($el.css('padding-left'), 10),
          paddingRight = parseInt($el.css('padding-right'), 10),
          marginLeft = parseInt($el.css('margin-left'), 10),
          marginRight = parseInt($el.css('margin-right'), 10),
          borderLeft = parseInt($el.css('borderLeftWidth'), 10),
          borderRight = parseInt($el.css('borderRightWidth'), 10);

      width += paddingLeft + paddingRight;
      width += marginLeft + marginRight;
      width += borderLeft + borderRight;
      return width;
    }

    function _attachNextPreviousListeners(slide, index) {

      // slide on the left
      if(index === currentIndex - 1) {
        slide.addPreviousListener();
      }

      // slide on the right
      if(index === currentIndex + 1) {
        slide.addNextListener()
      }
    }

    self.addSlide = function(slide, $el) {
      var index = slides.length,
          slideWidth = _width($el),
          centerSlideAxis = slideWidth/2,
          centerViewportAxis = self.viewportWidth/2,
          newLeft = index*slideWidth + (centerViewportAxis - centerSlideAxis) + index*$scope.slCarouselItemOffset;

      $scope.min = true;

      if(slides.length == 0) {
        $scope.max = true;
      }
      else {
        $scope.max = false;
      }

      $el.css({
        left: newLeft
      });

      angular.extend(slide, { _index: index, _$el: $el, _left: newLeft, _width: slideWidth });

      if(slides.length == 1) {
        slide.addNextListener()
      }

      slides.push(slide);
    };

    self.move = function(slide, direction) {
      var $el = slide._$el,
          slideWidth = slide._width,
          oldLeft = slide._left;

      var newLeft = (direction === 'left') ? oldLeft - slideWidth - $scope.slCarouselItemOffset : oldLeft + slideWidth + $scope.slCarouselItemOffset;

      $el.css({
        left: newLeft
      });

      angular.extend(slide, { _left: newLeft });
    };

    self.setViewportWidth = function(width) {
      if(typeof width === 'number') {
        self.viewportWidth = width;
      }
    };

    self.next = function() {
      var currentSlide = slides[currentIndex];

      if(currentSlide) {
        currentSlide.reset();
      }

      if(currentIndex == slides.length - 2) {
        $scope.max = true;
      }
      else if(currentIndex == slides.length - 1) {
        console.log('reached max');
        return;
      }
      currentIndex += 1;
      $scope.min = false;


      angular.forEach(slides, function(slide, index) {
        slide.reset();
        _attachNextPreviousListeners(slide, index);
        self.move(slide, 'left');
      });


    };

    self.previous = function() {
      var currentSlide = slides[currentIndex];

      if(currentSlide) {
        currentSlide.reset();
      }

      if(currentIndex == 1) {
        $scope.min = true;
      }
      else if(currentIndex == 0) {
        console.log("reached min");
        return;
      }
      currentIndex -= 1;
      $scope.max = false;

      angular.forEach(slides, function(slide, index) {
        slide.reset();
        _attachNextPreviousListeners(slide, index); 
        self.move(slide, 'right');
      })
    }
  });