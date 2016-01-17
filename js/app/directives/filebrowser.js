angular.module('app')
    .directive('filebrowser', function() {
    return {
        restrict: 'E',
        
        template: '<div>\
                        <div class="columnhead">\
                            <div class="column1">Filename</div>\
                            <div class="column2">Modified Date</div>\
                            <div class="column3">Size</div>\
                       </div>\
                       <directory dir="{{rootdir}}"></directory>\
                    </div>',
            
        scope: {
            rootdir: '@',
        },
    };
});