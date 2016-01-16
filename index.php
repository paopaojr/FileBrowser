<!DOCTYPE html>
<html>
    <head>
        <title>File Browser</title>
        <meta charset='utf-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" >
        <link href="css/stylesheet.css" rel="stylesheet" type="text/css" >
        
        <script src="js/vendors/angular.js" type="text/javascript"></script>
        <script src="js/app/app.js" type="text/javascript"></script>
        <script src="js/app/controllers/filebrowser.js" type="text/javascript"></script>
        <script src="js/app/directives/directory.js" type="text/javascript"></script>
        <script src="js/app/directives/file.js" type="text/javascript"></script>
        <script src="js/app/filters/filesize.js" type="text/javascript"></script>
        <script src="js/app/filters/modifydate.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="container" ng-app="app" ng-controller="filebrowser">
            <directory dir="."></directory>
        </div>
    </body>
</html>