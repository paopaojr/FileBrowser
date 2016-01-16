angular.module('app')
    .directive('file', function() {
    return {
        restrict: 'E',
        
        template: '<a href="{{path}}">{{name}} - {{modify | modifydate}} - {{size | filesize}}</a>',
        scope: {
            name: '@',
            path: '@',
            size: '@',
            modify: '@',
        },
        link: function(scope, element, attrs) {

        }
    };
});