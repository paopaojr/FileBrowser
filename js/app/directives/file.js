angular.module('app')
    .directive('file', function(API_DOWNLOAD_URL) {
    return {
        restrict: 'E',
        
        template: '<a href="" download ng-click="$event.stopPropagation()">\
                        <div class="column1">{{name}}</div>\
                        <div class="column2">{{modify | modifydate}}</div>\
                        <div class="column3">{{size | filesize}}</div>\
                    </a>',
            
        scope: {
            name: '@',
            path: '@',
            size: '@',
            modify: '@',
        },
        link: function(scope, element, attrs) {
            //clean up on delete this element with all children
            element.on('$destroy',function() {
            });
            
            element.find('a').attr('href', API_DOWNLOAD_URL + '?path=' + scope.path);
        }
    };
});