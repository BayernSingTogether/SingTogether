<?php

require('config.php');
require(ROOT_PATH.'/common/error.php');

$json = array();

if (!isset($_COOKIE['user'])) {
    try {
        $conn  = new PDO('mysql:host='.Setting::db_host.';dbname='.Setting::db_name, Setting::db_user, Setting::db_pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = "INSERT INTO user(user_vote) VALUES(1)";
        $res   = $conn->query($query);
        $query = "SELECT LAST_INSERT_ID()";
        $res   = $conn->query($query);
        $row   = $res->fetch();
        $json['ret'] = true;
        $json['msg'] = 'cookie `user='.$row[0].'` set successfully';
        setcookie("user", $row[0], time() + 99 * 365 * 24 * 3600);
        $conn  = null;
    } catch(PDOException $e) {
        $json['ret'] = false;
        $json['msg'] = $e->getMessage();
    }
    
} else {
    $json['ret'] = true;
    $json['msg'] = 'cookie `user='.$_COOKIE["user"].'` already exist';
}


header('Content-type: application/json');
echo json_encode($json, JSON_UNESCAPED_UNICODE);

?>




