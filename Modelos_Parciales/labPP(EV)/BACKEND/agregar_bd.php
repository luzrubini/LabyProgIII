<?php
require_once "AccesoDatos.php";

$cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;

$objJson = json_decode($cadenaJSON);    

$extension = pathinfo($_FILES["foto"]["name"],PATHINFO_EXTENSION);
$fecha=date("Gis");
$destino = "fotos/". $objJson->nombre ."." . $fecha. "." . $extension;

$objJson->pathFoto=$objJson->nombre ."." . $fecha. "." . $extension;

$objetoDatos = AccesoDatos::DameUnObjetoAcceso();

$consulta =$objetoDatos->RetornarConsulta("INSERT INTO perros (tamanio, edad, precio, nombre,raza,path_foto)"
                                                        . "VALUES(:tamanio, :edad, :precio, :nombre, :raza, :path_foto)"); 
            
$consulta->bindValue(':tamanio', $objJson->tamanio, PDO::PARAM_STR);
$consulta->bindValue(':edad', $objJson->edad, PDO::PARAM_INT);
$consulta->bindValue(':precio', $objJson->precio, PDO::PARAM_INT);
$consulta->bindValue(':nombre', $objJson->nombre, PDO::PARAM_STR);
$consulta->bindValue(':raza', $objJson->raza, PDO::PARAM_STR);
$consulta->bindValue(':path_foto', $objJson->pathFoto, PDO::PARAM_STR);

$consulta->execute();

$objRetorno= new stdClass();

$objRetorno->Ok= false; 
$objRetorno->pathFoto=$destino;


    if(move_uploaded_file($_FILES["foto"]["tmp_name"],$destino))
    {
        $objRetorno->Ok=true;
    }
       

echo json_encode($objRetorno);


?>