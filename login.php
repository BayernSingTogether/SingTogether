<?php

ini_set('display_errors', 'On');
define("DB_HOST",'m60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306'); //Host base de datos MySql
define("DB_USER", 'g48fqaog7yhlic5p'); //Nombre de la base de datos
define("DB_PASS" , 'l4l4wkcad1im3kbg'); //Contrase?a de la base de datos MySql
define("DB_NAME" , 'yw8uospcgbz3woi1'); //Nombre de la base de datos server final

#require('common/error.php');

echo 'login.php';

if (isset($_COOKIE["user"])) {
    echo 'isset'.$_COOKIE["user"];
} else {
    echo 'nosset';
}

?>
