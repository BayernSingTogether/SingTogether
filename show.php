<?php 
$hostname="m60mxazb4g6sb4nn.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306";
$database="yw8uospcgbz3woi1";
$username="g48fqaog7yhlic5p";
$password="l4l4wkcad1im3kbg";

try { 
	$conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
 	// set the PDO error mode to exception 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
	//echo "Connected successfully";
	 } catch(PDOException $e) { 
		echo "Connection failed: " . $e->getMessage();
	 }
	 $incidencias['app'] = array();
 
    
$consulta= 'SELECT * FROM songs';

 foreach ($conn->query($consulta) as $row) {
 	array_push($incidencias['app'], array(
            'id_sogs'    => $row['id_song'], 
            'name'  => $row['song_name'], 
        ));
 	$songs[]= $row['name'];
          }


header('Content-type: application/json');
echo json_encode($incidencias);

 ?>
