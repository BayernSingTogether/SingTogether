<?php

ini_set('display_errors', 'On');
$DB_HOST = 'm60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306'; //Host base de datos MySql
$DB_USER = 'g48fqaog7yhlic5p'; //Nombre de la base de datos
$DB_PASS = 'l4l4wkcad1im3kbg'; //Contrase?a de la base de datos MySql
$DB_NAME = 'yw8uospcgbz3woi1'; //Nombre de la base de datos server final

$json = array();

function get_millisecond() {
    list($t1, $t2) = explode(' ', microtime());
    return (float)sprintf('%.0f',(floatval($t1)+floatval($t2))*1000);
}

try {
    $conn  = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $query = "SELECT * FROM room WHERE room_id=1";
    $res   = $conn->query($query);
    $row   = $res->fetch();
    $room_playing_song_id        = $row['room_playing_song_id'];
    $soom_playing_song_timestrap = $row['soom_playing_song_timestrap'];
    
    $query = "SELECT * FROM song WHERE song_id=".$room_playing_song_id;
    $res   = $conn->query($query);
    $row   = $res->fetch();
    $song_length = $row['song_length'];
    
    
    echo $song_length * 1000 + $soom_playing_song_timestrap.'\n';
    echo get_millisecond();
    if ($song_length * 1000 + $soom_playing_song_timestrap > get_millisecond()) {
        echo 'update playing song';
        $query = "SELECT user_vote,count(*) FROM user GROUP BY user_vote ORDER BY count(*) DESC limit 1";
        $res   = $conn->query($query);
        $row   = $res->fetch();
        
        $query = "UPDATE room SET room_playing_song_id = ".$row[0].", soom_playing_song_timestrap = ".get_millisecond()." WHERE room_id = 1";
        $res   = $conn->query($query);
    }
    
    #$query = "UPDATE room SET room_playing_song_id = ".$row[0].", soom_playing_song_timestrap = ".get_millisecond()." WHERE room_id = 1";
    #$res   = $conn->query($query);
    
    $json['ret'] = true;
    $json['msg'] = '';
} catch(PDOException $e) {
    $json['ret'] = false;
    $json['msg'] = $e->getMessage();
}
$conn = null;

header('Content-type: application/json');
echo json_encode($json, JSON_UNESCAPED_UNICODE);

?>