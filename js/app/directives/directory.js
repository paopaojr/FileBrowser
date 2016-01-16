angular.module('app')
    .directive('directory', function($http, $compile, API_URL) {
    return {
        restrict: 'E',
        scope: {
            dir: '@',
        },
        template: '<ul ng-repeat="file in files">\
                    <li ng-if="file.type == \'dir\'">\
                        <div ng-click="onToggleDirClick($event, file.name)">{{file.name}}</div>\
                    </li>\
                    <li ng-if="file.type == \'file\'">\
                        <file name="{{file.name}}" modify="{{file.modify}}" size="{{file.size}}" path="{{file.path}}"></file>\
                    </li>\
                </ul>',
        link: function(scope, element, attrs) {
            scope.files = [];
            
            element.on('$destroy',function() {
                scope.files = [];
            });
            
            scope.getFiles = function(path){
                $http.get(API_URL + '?path=' + path).then(function(response) {
                    scope.files = response.data;
                });
            }
            
            scope.onToggleDirClick = function($event, dir){
                $event.stopPropagation();
                
                var child = angular.element($event.currentTarget).children();
                if(child.length === 0){
                    scope.onExpandFolder($event, dir);
                }else{
                    scope.onCollapseFolder($event);
                }
            }
            
            scope.onExpandFolder = function($event, dir){
                var div = angular.element($event.currentTarget);
                var html = '<directory dir="' + scope.dir + '/' + dir + '"></directory>';
                div.append($compile(html)(scope));
            }
            
            scope.onCollapseFolder = function($event){
                var child = angular.element($event.currentTarget).children();
                child.remove();
            }
            
            scope.getFiles(scope.dir);
        }
    };
});