<?php
require_once dirname(__FILE__) . '/HandlePost.php';
$oHandlePost =  HandlePost::getInstance();
$oHandlePost->process();