<?php

require_once 'config.php';
require_once 'classes/FileBrowser.class.php';

class FileBrowserTest extends PHPUnit_Framework_TestCase
{
    public function testValidBrowseURL(){
        $this->assertTrue(is_dir(BROWSE_URL));
    }
    
    public function testNoTranverseOutsideRoot(){
        $this->assertFalse(FileBrowser::getFolderContent('..'));
    }
    
    public function testValidResultFiles(){
        $result = json_decode(FileBrowser::getFolderContent(''), true);
        
        foreach($result as $file_info){
            if($file_info['type'] == 'dir'){
                $this->assertTrue(is_dir($file_info['path'] ));
            }
            else if($file_info['type'] == 'file'){
                $this->assertTrue(is_file($file_info['path'] ));
            }
        }
    }
}
?>