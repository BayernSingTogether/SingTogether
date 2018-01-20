<?php

ini_set('display_errors', 'On');
$DB_HOST = 'm60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306'; //Host base de datos MySql
$DB_USER = 'g48fqaog7yhlic5p'; //Nombre de la base de datos
$DB_PASS = 'l4l4wkcad1im3kbg'; //Contrase?a de la base de datos MySql
$DB_NAME = 'yw8uospcgbz3woi1'; //Nombre de la base de datos server final

$json = array();

try {
    $conn  = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query = "SELECT user_vote,count(*) FROM user GROUP BY user_vote ORDER BY count(*) DESC limit 1";
    $res   = $conn->query($query);
    $row = $res->fetch();
    $json['ret'] = true;
    $json['msg'] = 'get the selected song successfully';
    $json['selected_song_id'] = $row[0];
} catch(PDOException $e) {
    $json['ret'] = false;
    $json['msg'] = $e->getMessage();
}
$conn = null;


header('Content-type: application/json');
echo json_encode($json, JSON_UNESCAPED_UNICODE);

#

?>