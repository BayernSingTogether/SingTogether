<?php
require('global.php');
$json = array();
try {
    $conn  = new PDO('pgsql:host='.setting::db_host.';port='.setting::db_port.';dbname='.setting::db_name.';user='.setting::db_user.';password='.setting::db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $query = 'SELECT * FROM song';
    $res   = $conn->query($query);
    $json['list'] = array();
    while ($row = $res->fetch()) {
        $local_query = 'SELECT count(*) FROM user WHERE user_vote = '.$row['song_id'].' GROUP BY user_vote';
        $local_res   = $conn->query($local_query);
        $local_row   = $local_res->fetch();
        if ($local_row[0] == NULL)
            $local_row[0] = 0;
        array_push($json['list'], array(
            'song_id'     => $row['song_id'], 
            'song_length' => $row['song_length'],
            'song_name'   => $row['song_name'],
            'song_artist' => $row['song_artist'],
            'song_file'   => $row['song_file'],
            'song_lyric'  => $row['song_lyric'],
            'song_vote'   => $local_row[0]
        ));
    }
    $json['ret'] = true;
    $json['msg'] = 'get song list successfully';
} catch(PDOException $e) {
    $json['ret'] = false;
    $json['msg'] = $e->getMessage();
}
echo json_encode($json, JSON_UNESCAPED_UNICODE);
?>
