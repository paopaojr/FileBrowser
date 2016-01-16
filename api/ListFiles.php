<?php

require_once 'FileBrowser.class.php';

$path = filter_input(INPUT_GET, 'path');
echo FileBrowser::getFolderContent($path);
