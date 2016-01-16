<?php

require_once 'config.php';

class FileBrowser
{
    public static function getFolderContent($path){
        //prevent transverse above BROWSE_URL dir         
        if(strpos(realpath(BROWSE_URL . $path), realpath(BROWSE_URL)) !== 0){
            return false;
        }
        
        $iterator = new DirectoryIterator(BROWSE_URL . $path);
        $result = array();
        
        foreach ($iterator as $fileInfo) {
            if($fileInfo->isDot()){
                continue;
            }
            
            $type = '';
            if($fileInfo->isFile() === true){
                $type = 'file';
            }
            else if($fileInfo->isDir() === true){
                $type = 'dir';
            }
            
            $info = array(
                'name' => $fileInfo->getFilename(),
                'path' => $path . '/' . $fileInfo->getFilename(),
                'size' => $fileInfo->getSize(),
                'modify' => $fileInfo->getMTime(),
                'type' => $type,
            );
            
            $result []= $info;
        } 
        
        return json_encode($result);
    }
}
?>