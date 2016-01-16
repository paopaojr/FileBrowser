<?php

require_once 'FileBrowser.class.php';

$path = filter_input(INPUT_GET, 'path');
var_dump(FileBrowser::getFolderContent($path));
