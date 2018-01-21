<?php
require('global.php');
$json = array();

try {
    $conn  = new PDO('mysql:host='.setting::db_host.';dbname='.setting::db_name, setting::db_user, setting::db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $need_set_cookie = false;
    if (!isset($_COOKIE['user'])) {
        $need_set_cookie = true;
    } else {
        $query = 'SELECT * FROM user WHERE user_id='.$_COOKIE['user'];
        $res   = $conn->query($query);
        $row   = $res->fetch();
        if ($row == NULL)
            $need_set_cookie = true;
    }
    
    if ($need_set_cookie == true) {
        $query = 'INSERT INTO user(user_vote) VALUES(NULL)';
        $res   = $conn->query($query);
        $query = 'SELECT LAST_INSERT_ID()';
        $res   = $conn->query($query);
        $row   = $res->fetch();
        $json['ret'] = true;
        $json['msg'] = 'cookie `user='.$row[0].'` set successfully';
        setcookie('user', $row[0], time() + 99 * 365 * 24 * 3600);
    } else {
         $json['ret'] = true;
         $json['msg'] = 'cookie `user='.$_COOKIE["user"].'` already exist';
    }
} catch(PDOException $e) {
    $json['ret'] = false;
    $json['msg'] = $e->getMessage();
}
echo json_encode($json, JSON_UNESCAPED_UNICODE);
?>




