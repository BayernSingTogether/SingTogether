<?php
function get_millisecond() {
    list($t1, $t2) = explode(' ', microtime());
    return (float)sprintf('%.0f',(floatval($t1)+floatval($t2))*1000);
}

require('global.php');
$json = array();
try {
    $conn  = new PDO('mysql:host='.setting::db_host.';dbname='.setting::db_name, setting::db_user, setting::db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $query = 'SELECT * FROM room WHERE room_id=1';
    $res   = $conn->query($query);
    $row   = $res->fetch();
    $room_playing_song_id        = $row['room_playing_song_id'];
    $room_playing_song_timestrap = $row['room_playing_song_timestrap'];
    $room_next_song_id           = $row['room_next_song_id'];
    
    $query = 'SELECT * FROM song WHERE song_id='.$room_playing_song_id;
    $res   = $conn->query($query);
    $row   = $res->fetch();
    $song_length = $row['song_length'];
    
    $millisecond = get_millisecond();
    if ($song_length * 1000 + $room_playing_song_timestrap < $millisecond) {
        $query = 'UPDATE user SET user_vote = NULL WHERE user_vote = '.$room_playing_song_id;
        $res   = $conn->query($query);
        
        $query = 'SELECT user_vote,count(*) FROM user WHERE user_vote IS NOT NULL GROUP BY user_vote ORDER BY count(*) DESC limit 1';
        $res   = $conn->query($query);
        $row   = $res->fetch();
        if ($row[0] == NULL)
            $row[0] = 1;
        $query = 'UPDATE room SET room_playing_song_id = '.$room_next_song_id.', room_playing_song_timestrap = '.$millisecond.', room_next_song_id = '.$row[0].' WHERE room_id = 1';
        $res   = $conn->query($query);
        
        $query = "SELECT * FROM room WHERE room_id=1";
        $res   = $conn->query($query);
        $row   = $res->fetch();
        $room_playing_song_id        = $row['room_playing_song_id'];
        $room_playing_song_timestrap = $row['room_playing_song_timestrap'];
        $room_next_song_id           = $row['room_next_song_id'];
    }

    $json['ret'] = true;
    $json['msg'] = 'get playing song done, current timestrap = '.$millisecond;
    $json['room_playing_song_id']        = $room_playing_song_id;
    $json['room_playing_song_timestrap'] = $room_playing_song_timestrap;
    $json['room_next_song_id']           = $room_next_song_id;
} catch(PDOException $e) {
    $json['ret'] = false;
    $json['msg'] = $e->getMessage();
}
echo json_encode($json, JSON_UNESCAPED_UNICODE);
?>