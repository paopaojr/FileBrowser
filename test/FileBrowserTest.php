<?php

require_once 'config.php';
require_once 'classes/FileBrowser.class.php';

class FileBrowserTest extends PHPUnit_Framework_TestCase
{
    public function testValidBrowseURL(){
        $this->assertTrue(is_dir(BROWSE_URL));
    }
    
    public function testNoTranverseOutsideRoot(){
        $top_level = false;
        //in this case, it it top level directory - cannot be tranverse back
        if(strcmp(realpath(BROWSE_URL . '..'), realpath(BROWSE_URL)) === 0){
            $top_level = true;
        }
        
        $this->assertFalse(!$top_level && FileBrowser::getFolderContent('..'));
        
        //pick random file outside root scope and try to download
        //note this test only one level higher
        $iterator = new DirectoryIterator(BROWSE_URL . '..');
        foreach ($iterator as $fileInfo) {
            if($fileInfo->isFile() === true){
                $this->assertFalse(!$top_level && FileBrowser::fileDownload($fileInfo->getPathname(), true));
                break;
            }
        }
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