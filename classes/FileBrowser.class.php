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
        
        //WARNING this doesn't work on very wierd file name, for English file name it should be fine.
        //try-catch will still make it
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
            
            try{
                $info = array(
                    'name' => $fileInfo->getFilename(),
                    'path' => $fileInfo->getPathname(),
                    'size' => $fileInfo->getSize(),
                    'modify' => $fileInfo->getMTime(),
                    'type' => $type,
                );
                
                $result []= $info;
            }catch(Exception $e){
                //TODO place error/warning log here
            }
        } 
        
        return json_encode($result);
    }
    
    public static function fileDownload($filepath, $test = false){
        //prevent transverse above BROWSE_URL dir         
        if(strpos(realpath($filepath), realpath(BROWSE_URL)) !== 0){
            return false;
        }
        
        //for unit test, no need to download read file
        if($test){
            return true;
        }
        
        if(is_file($filepath)){
            $size = filesize($filepath);
            
            if (function_exists('finfo_open')) {
                $finfo = finfo_open(FILEINFO_MIME_TYPE);
                $mimetype = finfo_file($finfo, $filepath);
                finfo_close($finfo);
            } else {
                $mimetype = 'application/octet-stream';
            }
            
            //clear all output buffer
            ob_end_clean();      

            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
            header('Cache-Control: private', false);
            header("Content-Type: $mimetype");
            header("Content-Disposition: attachment; filename=\"".basename($filepath).'"');
            header("Content-length: ".$size);
            header("Content-Transfer-Encoding: binary");

            readfile($filepath); 
        }
        else{
            return false;
        }
    }
}
?>