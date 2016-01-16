angular.module('app')
    .filter( 'modifydate', function () {

        return function (date) {
            if (isNaN(parseInt(date)) || !isFinite(date)) {
                return '?';
            }

            var d = new Date(0);
            d.setUTCSeconds(date);
            
            return d.toDateString();
        };
    });