<?php

require_once 'FileBrowser.class.php';

$path = filter_input(INPUT_GET, 'path');
FileBrowser::fileDownload($path);