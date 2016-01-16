angular.module('app')
    .filter( 'modifydate', function () {

        return function (date) {
            if (isNaN(parseInt(date)) || !isFinite(date)) {
                return '?';
            }

            var d = new Date(0);
            var today = new Date();
            
            d.setUTCSeconds(date);
            
            var hours = d.getHours();
            var minutes = d.getMinutes();
            minutes = (minutes >= 10 ? minutes : '0' + minutes.toString());
            
            if(d.getDate() === today.getDate() &&
               d.getMonth() === today.getMonth() &&
               d.getFullYear() === today.getFullYear()){
                return 'Today, ' + hours + ':' + minutes + ' ' + (hours >= 12 ? 'PM' : 'AM');
            }
            
            return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + 
                    ', ' + hours + ':' + minutes + ' ' + (hours >= 12 ? 'PM' : 'AM');
        };
    });