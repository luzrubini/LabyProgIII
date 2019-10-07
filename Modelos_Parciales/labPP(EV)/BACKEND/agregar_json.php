<?php

$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;



$objJson = json_decode($cadenaJSON);    

$extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);
$fecha=date("Gis");
$destino = "fotos/". $objJson->nombre ."." . $fecha. "." . $extension;

$objJson->pathFoto= $objJson->nombre ."." . $fecha. "." . $extension;

$cadenaJSON2=json_encode($objJson);

$ar = fopen("./perro.json", "a");

$cant = fwrite($ar, $cadenaJSON2 . "\r\n");

fclose($ar);

$objRetorno= new stdClass();

$objRetorno->Ok= false; 
$objRetorno->pathFoto=$destino;


if(move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
{
    $objRetorno->Ok=true;

}

echo json_encode($objRetorno);


?>