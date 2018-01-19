<?php
 define("DB_HOST",'m60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306'); //Host base de datos MySql
 define("DB_USER", 'g48fqaog7yhlic5p'); //Nombre de la base de datos
 define("DB_PASS" , 'l4l4wkcad1im3kbg'); //Contraseña de la base de datos MySql
 define("DB_NAME" , 'yw8uospcgbz3woi1'); //Nombre de la base de datos server final


 $con=mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME) or die("problemas con conexion server");
 //mysqli_query("SET CHARACTER SET utf8");  
//mysqli_query("SET NAMES utf8");

 if (!$con) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$incidencias['appc'] = array();
if( $con )  
{  
	echo "hola majo";
 
$consulta="SELECT * FROM songs ORDER BY id_sogs ASC ";

$res=  mysqli_query($con, $consulta);
    
    while( $row = mysqli_fetch_array($res) ) {
        array_push($incidencias['appc'], array(
            'id_sogs'    => $row['id_sogs'], 
            'name'  => $row['name'], 
        ));
    }
    mysqli_free_result($res);
    mysqli_close($con);
}

header('Content-type: application/json');
echo json_encode($incidencias);

?>
 