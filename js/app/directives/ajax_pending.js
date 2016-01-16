angular.module('app')
    .directive('ajaxPending', function($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.class = 'show';
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        scope.class = 'show';
                    }else{
                        scope.class = 'hide';
                    }
                });
            }
        };
    });