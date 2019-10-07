<?php
require_once "AccesoDatos.php";

$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;

$objJson = json_decode($cadenaJSON);    

$objetoDatos = AccesoDatos::DameUnObjetoAcceso();

//ejecuto la consulta de eliminar un usuario en el "legajo" especificado en la base de datos
$consulta =$objetoDatos->RetornarConsulta("DELETE FROM perros WHERE nombre= :nombre and raza=:raza and edad=:edad and precio=:precio");

$consulta->bindValue(':edad', $objJson->edad, PDO::PARAM_INT);
$consulta->bindValue(':nombre', $objJson->nombre, PDO::PARAM_STR);
$consulta->bindValue(':raza', $objJson->raza, PDO::PARAM_STR);
$consulta->bindValue(':precio', $objJson->precio, PDO::PARAM_INT);

$consulta->execute();

 $objRetorno= new stdClass();

 $objRetorno->Ok= false; 
 $objRetorno->pathFoto=$destino;

 echo json_encode($objRetorno);
?>