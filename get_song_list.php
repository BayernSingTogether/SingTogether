<?php

ini_set('display_errors', 'On');
$DB_HOST = 'm60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306'; //Host base de datos MySql
$DB_USER = 'g48fqaog7yhlic5p'; //Nombre de la base de datos
$DB_PASS = 'l4l4wkcad1im3kbg'; //Contrase?a de la base de datos MySql
$DB_NAME = 'yw8uospcgbz3woi1'; //Nombre de la base de datos server final

$json['list'] = array();

try {
    $conn  = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query = "SELECT * FROM song";
    $res   = $conn->query($query);
    while ($row = $res->fetch()) {
        array_push($json['list'], array(
            'song_id'     => $row['song_id'], 
            'song_length' => $row['song_length'],
            'song_name'   => $row['song_name'],
            'song_file'   => $row['song_file'],
            'song_lyric'  => $row['song_lyric']
        ));
    }
    $json['ret'] = true;
    $json['msg'] = 'get song list successfully';
} catch(PDOException $e) {
    $json['ret'] = false;
    $json['msg'] = $e->getMessage();
}
$conn = null;


header('Content-type: application/json');
echo json_encode($json, JSON_UNESCAPED_UNICODE);

?>
