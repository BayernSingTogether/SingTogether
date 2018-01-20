<?php

function handle_error($msg) {
    $json = array();
    $json['ret'] = false;
    $json['msg'] = $msg;
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
    exit();
}

?>