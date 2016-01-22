(function(){
  var app = angular.module("directives_practice", []);

  var injectParams = ['$location'];

  var autoHighlight = function($location){

    function link(scope, elem, attrs){
      function setActive(){
        var pathPrefix;
        var path = $location.path(),
            className = scope.highlightClassName || "active";

        if(path){
          window.location.href.indexOf('#') > -1 ? pathPrefix = '#' : '';

          angular.forEach(elem.find('li'), function(li, i){
            var anchor = li.querySelector('a');

            var href = (anchor && anchor.href) ? anchor.href :
                                                 anchor.getAttribute('data-href').reqplace('#', '');

            var trimmedHref = href.substr(href.indexOf(pathPrefix + '/') + 1, href.length);

            var basePath = path.substr(0, trimmedHref.length);

            if(trimmedHref === basePath){
              angular.element(li).addClass(className);
            } else {
              angular.element(li).removeClass(className);
            }
          });
        }
      };

      setActive();

      scope.$on('$locationChangeSuccess', setActive);
    }

    return{
      restrict: 'A',
      scope: {
        highlightClassName: '@',
      },
      link: link
    }
  }

  autoHighlight.$inject = injectParams;

  app.directive('autoHighlight', autoHighlight);


})();
