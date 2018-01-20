<?php
require('global.php');
$json = array();
try {
    $conn  = new PDO('mysql:host='.setting::db_host.';dbname='.setting::db_name, setting::db_user, setting::db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query = 'SELECT user_vote,count(*) FROM user GROUP BY user_vote ORDER BY count(*) DESC limit 1';
    $res   = $conn->query($query);
    $row = $res->fetch();
    $json['ret'] = true;
    $json['msg'] = 'get the selected song successfully';
    $json['selected_song_id'] = $row[0];
} catch(PDOException $e) {
    $json['ret'] = false;#
    $json['msg'] = $e->getMessage();
}
echo json_encode($json, JSON_UNESCAPED_UNICODE);
?>