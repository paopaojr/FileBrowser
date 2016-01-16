angular.module('app')
    .filter( 'modifydate', function () {

        return function (date) {
            if (isNaN(parseInt(date)) || !isFinite(date)) {
                return '?';
            }

            var d = new Date(0);
            var today = new Date();
            
            d.setUTCSeconds(date);
            
            if(d.getDate() === today.getDate() &&
               d.getMonth() === today.getMonth() &&
               d.getFullYear() === today.getFullYear()){
                return 'Today, ' + d.getHours() + ':' + d.getMinutes() + ' ' + (d.getHours() >= 12 ? 'PM' : 'AM');
            }
            
            return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + 
                    ', ' + d.getHours() + ':' + d.getMinutes() + ' ' + (d.getHours() >= 12 ? 'PM' : 'AM');
        };
    });