<?php

function get_param($method, $name, $required = true) {
    $json = array();

    switch ($method) {
    case 'GET':
        if (!isset($_GET[$name])  && $required)
            handle_error('missing param'.$name);
        return $_GET[$name];
    case 'POST':
        if (!isset($_POST[$name]) && $required)
            handle_error('missing param'.$name);
        return $_POST[$name];
    default:
        handle_error('unsupported request method');
    }
}

?>