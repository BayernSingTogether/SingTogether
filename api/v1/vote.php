<?php
require('global.php');
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
            $conn  = new PDO('pgsql:host='.setting::db_host.';port='.setting::db_port.';dbname='.setting::db_name.';user='.setting::db_user.';password='.setting::db_pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $query = 'UPDATE user SET user_vote='.$_GET['song_id'].' WHERE user_id='.$_COOKIE['user'];
            $res   = $conn->query($query);
            $json['ret'] = true;
            $json['msg'] = 'update finish';
        } catch(PDOException $e) {
            $json['ret'] = false;
            $json['msg'] = $e->getMessage();
        }
    }
}
echo json_encode($json, JSON_UNESCAPED_UNICODE);
?>