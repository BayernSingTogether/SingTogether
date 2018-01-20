<?php

ini_set('display_errors', 'On');
$DB_HOST = 'm60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306'; //Host base de datos MySql
$DB_USER = 'g48fqaog7yhlic5p'; //Nombre de la base de datos
$DB_PASS = 'l4l4wkcad1im3kbg'; //Contrase?a de la base de datos MySql
$DB_NAME = 'yw8uospcgbz3woi1'; //Nombre de la base de datos server final

$json = array();

if (!isset($_COOKIE["user"])) {
    $json['ret'] = false;
    $json['msg'] = 'cookie `user` not set yet';
} else {
    
    if (!isset($_GET['song_id'])) {
        $json['ret'] = false;
        $json['msg'] = 'param `song_id` not set yet';
    } else {
        try {
            $conn  = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = "UPDATE user SET user_vote=".$_GET['song_id']." WHERE user_id=".$_COOKIE["user"];
            $res   = $conn->query($query);
            $json['ret'] = true;
            $json['msg'] = 'update finish';
        } catch(PDOException $e) {
            $json['ret'] = false;
            $json['msg'] = $e->getMessage();
        }
        $conn = null;
    }
}

header('Content-type: application/json');
echo json_encode($json, JSON_UNESCAPED_UNICODE);

?>