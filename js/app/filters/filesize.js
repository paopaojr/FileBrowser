angular.module('app')
    .filter( 'filesize', function () {
        var units = ['bytes','KB','MB','GB','TB','PB'];

        return function (bytes) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                return '?';
            }

            var unit = 0;
            
            if(bytes < 1024) {
                return bytes + ' ' + 'B';
            }

            while (bytes >= 1024) {
                bytes /= 1024;
                unit++;
            }

            return bytes.toFixed(2) + ' ' + units[ unit ];
        };
    });