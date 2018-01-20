<?php

require('common/config.php');
require('common/error.php');
require('common/param.php');

function GET_cb()
{
    global $method;
    
    $user = get_param($method, 'user');
    echo $user;
}

$method    = $_SERVER['REQUEST_METHOD'];
$method_cb = $method.'_cb';
if (function_exists($method_cb)) {
    call_user_func($method_cb);
} else {
    handle_error('request methon error');
}

?>
