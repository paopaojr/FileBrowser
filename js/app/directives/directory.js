angular.module('app')
    .directive('directory', function($http, $compile, API_LISTFILE_URL) {
    return {
        restrict: 'E',
        scope: {
            dir: '@',
            indent: '@',
        },
        template: '<ul>\
                    <li ng-repeat="file in files" ng-class="class" ng-if="file.type == \'dir\'">\
                        <div ng-click="onToggleDirClick($event, file.name)">\
                            <div class="column1">{{file.name}}</div>\
                            <div class="column2">{{file.modify | modifydate}}</div>\
                            <div class="column3">--</div>\
                        </div>\
                    </li>\
                    <li ng-repeat="file in files" class="file" ng-if="file.type == \'file\'">\
                        <file name="{{file.name}}" modify="{{file.modify}}" size="{{file.size}}" path="{{file.path}}"></file>\
                    </li>\
                </ul>',
        link: function(scope, element, attrs) {
            scope.files = [];
            scope.class = 'dir';
            
            element.on('$destroy',function() {
                scope.files = [];
            });
            
            scope.getFiles = function(path){
                $http.get(API_LISTFILE_URL + '?path=' + path).then(function(response) {
                    scope.files = response.data;
                });
            }
            
            scope.onToggleDirClick = function($event, dir){
                $event.stopPropagation();
                
                var div = angular.element($event.currentTarget);
                var child = div.find('directory');
                if(child.length === 0){
                    scope.onExpandFolder($event, dir);
                    scope.class = 'dir active';
                }else{
                    scope.onCollapseFolder($event);
                    scope.class = 'dir';
                }
            }
            
            scope.onExpandFolder = function($event, dir){
                var div = angular.element($event.currentTarget);
                var html = '<directory dir="' + scope.dir + '/' + dir + '"></directory>';
                div.append($compile(html)(scope));
            }
            
            scope.onCollapseFolder = function($event){
                var child = angular.element($event.currentTarget).find('directory');
                child.remove();
            }
            
            scope.getFiles(scope.dir);
        }
    };
});