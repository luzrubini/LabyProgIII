<?php
require_once "AccesoDatos.php";
    $perros =[];

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
    $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM perros");

    $consulta->execute();
        
    while($fila = $consulta->fetch())
    {
        $objPerro = new stdClass();
        $objPerro->nombre=$fila[4];
        $objPerro->raza=$fila[5];
        $objPerro->pathFoto=$fila[6];
        $objPerro->tamanio=$fila[1];
        $objPerro->edad=$fila[2];
        $objPerro->precio=$fila[3];

       array_push($perros,$objPerro);
    }

echo json_encode($perros);


?>