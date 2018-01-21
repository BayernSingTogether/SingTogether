<?php
require('global.php');
$json = array();
if (!isset($_COOKIE["user"])) {
    $json['ret'] = false;
    $json['msg'] = 'cookie `user` not set yet';
} else {
    try {
        $conn  = new PDO('pgsql:host='.setting::db_host.';port='.setting::db_port.';dbname='.setting::db_name.';user='.setting::db_user.';password='.setting::db_pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = 'SELECT user_vote FROM user WHERE user_id='.$_COOKIE["user"];
        $res   = $conn->query($query);
        $row   = $res->fetch();
        if ($row == NULL) {
            $json['ret'] = false;
            $json['msg'] = 'illegal user_id';
        } else {
            $json['ret'] = true;
            $json['msg'] = 'get my vote successfully!';
            $json['user_vote'] = $row['user_vote'];
        }
        
    } catch(PDOException $e) {
        $json['ret'] = false;
        $json['msg'] = $e->getMessage();
    }
}
echo json_encode($json, JSON_UNESCAPED_UNICODE);
?>