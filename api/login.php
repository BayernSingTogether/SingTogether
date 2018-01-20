<?php

require('config.php');
require('error.php');

$json = array();

if (!isset($_COOKIE["user"])) {
    try {
        $conn  = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = "INSERT INTO user(user_vote) VALUES(1)";
        $res   = $conn->query($query);
        $query = "SELECT LAST_INSERT_ID()";
        $res   = $conn->query($query);
        $row   = $res->fetch();
        $json['ret'] = true;
        $json['msg'] = 'cookie `user='.$row[0].'` set successfully';
        setcookie("user", $row[0], time() + 99 * 365 * 24 * 3600);
    } catch(PDOException $e) {
        $json['ret'] = false;
        $json['msg'] = $e->getMessage();
    }
    $conn = null;
} else {
    $json['ret'] = true;
    $json['msg'] = 'cookie `user='.$_COOKIE["user"].'` already exist';
}


header('Content-type: application/json');
echo json_encode($json, JSON_UNESCAPED_UNICODE);

?>




