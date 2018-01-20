<?php

ini_set('display_errors', 'On');
define("DB_HOST",'m60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306'); //Host base de datos MySql
define("DB_USER", 'g48fqaog7yhlic5p'); //Nombre de la base de datos
define("DB_PASS" , 'l4l4wkcad1im3kbg'); //Contrase?a de la base de datos MySql
define("DB_NAME" , 'yw8uospcgbz3woi1'); //Nombre de la base de datos server final

$json = array();
echo '?';

if (!isset($_COOKIE["user"])) {
    
    /*try {
        $conn  = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASS);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = "insert into users values()";
        $res   = $conn->exec($query);
        $query = "SELECT LAST_INSERT_ID()";
        $res   = $conn->exec($query);
        $row = $res->fetch(); 
        print_r($row);
        #setcookie("cookie_name", "cookie_value", time() + 99 * 365 * 24 * 3600);
    } catch(PDOException $e) {
        $json['ret'] = false;
        $json['msg'] = $e->getMessage();
        exit();
    }*/
    echo '1';
    $json['ret'] = true;
    $json['msg'] = 'test';
    
} else {
    echo '2';
    $json['ret'] = true;
    $json['msg']    = 'cookie user already exist';
}

#header('Content-type: application/json');
#echo json_encode($json, JSON_UNESCAPED_UNICODE);

?>
