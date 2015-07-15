var app = angular.module("app");
app.directive("slidebar", function($http) {
  return {
    restrict: 'A',
    require:'slidebar',
    scope:{
      rangos: '=',
      max: '='
    },
    controller: function($scope) {
      if(!$scope.rangos){
        $scope.rangos ={};
      }
      this.rangos = $scope.rangos;
      
      var bars = [];
      var startX;
      var startT;
      var maxTop;
      var minTop;
      var barActual;

      var lastBar;


      this.addBar = function(bar){
        bar.leftBar = lastBar;
        if(lastBar)
          lastBar.rigthBar = bar;
        lastBar = bar;
        bars.push(bar);
      }
      this.distributeBars = function (totalWidth){
        for (var i = bars.length-1; i >=0; i--) {
          var barElement = bars[i].element;
          var valorRango = $scope.rangos[bars[i].rango];

          if(!valorRango){
            valorRango = ($scope.max*(i+1)/bars.length).toFixed(0);
          }
          var percentage = valorRango*100/$scope.max;
          $scope.rangos[bars[i].rango] = valorRango;
          barElement.css('width', percentage + '%');
          barElement.css('text-align','right')
          barElement.css('z-index', bars.length-i);
        };
      }
      this.selectBar = function (bar, clientX){
        startX = clientX;
        startT = parseInt(bar.element.css('width'));
        barActual = bar;
        barElementActual = bar.element;
        maxTop = (barActual.rigthBar)? parseInt(barActual.rigthBar.element.width()):barElementActual.parent().width();  
        minTop = (barActual.leftBar)? parseInt(barActual.leftBar.element.width()):0;    
      }
      angular.element(window).mousemove(function(ev) {
        if (barActual) {
          /*calculate new top*/
          var newTop = startT + (ev.clientX - startX);

          /*stay in parent*/
          newTop = (newTop<minTop)?minTop:(newTop>maxTop)?maxTop:newTop;
          var percentage = newTop/barActual.element.parent().width();
          barActual.element.css('width', percentage*100 +'%' );
          $scope.$apply(function(){
            $scope.rangos[barActual.rango] = (percentage*$scope.max).toFixed(0);
          })
        }
      }).mouseup(function() {
        barActual = null;
      });
      
    },
    link: {
      pre:function(scope, element, attributes, slidebarCrtl) {
      },
      post:function(scope, element, attributes, slidebarCrtl) {
        slidebarCrtl.distributeBars(element.css('width'));
      }
    }
    
  };
});
app.directive("sbBar", function($http) {
  return {
    restrict: 'A',
    require:['^slidebar','sbBar'],
    controller: function($scope) {
      this.bar = null;
      this.setBar = function (bar){
        this.bar = bar;
      }
      this.getBar = function (){
        return this.bar;
      }

    },
    link: function(scope, element, attributes, Crtlrs) {
      var slidebarCrtl = Crtlrs[0];
      var sbBarCrtl = Crtlrs[1];
      
      element.css('float', 'left');
      element.css('height', 'inherit');
      element.css('position', 'absolute')
      var bar = {element:element, rango:attributes.rango}
      slidebarCrtl.addBar(bar);
      sbBarCrtl.setBar(bar);
      element.mousedown(function(ev) {
        slidebarCrtl.selectBar(bar, ev.clientX);
      });

    }
  };
});
app.directive("sbSlider", function($http) {
  return {
    restrict: 'A',
    require:['^slidebar','^sbBar'],
    controller: function($scope) {

    },
    link: function(scope, element, attributes, Crtlrs) {
      slidebarCrtl = Crtlrs[0];
      sbBarCrtl = Crtlrs[1];
    }
  };
});
