<?php
class HandlePost
{
    protected $requestData ;
    protected static $oStaticInstance;
    public function __construct()
    {
        $this->setErrorReporting();
        $this->requestData = $this->getRequestData();
    }
    protected function setErrorReporting()
    {
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
    }
    protected function getRequestData(){
        return $_POST;
    }
    protected function getContentToSave()
    {
        $aRequestData = $this->getRequestData();
        return isset($aRequestData['csv']) ? $aRequestData['csv'] : false;
    }
    protected function saveContent()
    {
        $vContent = $this->getContentToSave();
        $vPathToSave = $this->getFilePathToSave();
        $vParentPath = dirname($vPathToSave);
        if (file_exists($vParentPath) &&
            is_writable(dirname($vParentPath))){
            $bReturn = file_put_contents($vPathToSave,$vContent );
            chmod($vPathToSave,0777 );
            return $bReturn;
        }
        else{
            throw new Exception($vPathToSave . ' is not writeable ');
        }

    }
    protected function getFilePathToSave()
    {
        return dirname(__FILE__)  . '/local/timesheet.csv';
    }
    public function process()
    {
        $this->sendStatus();
    }
    protected function sendStatus ()
    {
        $vSave =  $this->saveContent();
        $aOutput = [
            'status' => 'failed',
        ];
        if ($vSave){
            $aOutput['status'] = 'success';
        }
        $this->sendJsonWithHeader($aOutput);
    }
    protected function sendJsonWithHeader($aJson)
    {
        header('Content-Type: application/json');
        echo json_encode($aJson);
    }
    public static function getInstance()
    {
        if (static::$oStaticInstance){
            return static::$oStaticInstance;
        }
        $oOverRide = self::getOverrideObject();
        return $oOverRide ?: (new HandlePost());
    }
    protected static function getOverrideObject()
    {
        $vClassName = 'OverrideHandlePost';
        $vLocalPath = dirname(__FILE__) . '/local/' . $vClassName . '.php';
        if (file_exists($vLocalPath)){
            include $vLocalPath;
        }
        if (@class_exists($vClassName)){
            return new $vClassName;
        }
    }
}
