<?php

function handle_error($errmsg) {
    $json = array();
    $json['status'] = false;
    $json['errmsg'] = $errmsg;
    echo json_encode($json, JSON_UNESCAPED_UNICODE);
    exit();
}

?>