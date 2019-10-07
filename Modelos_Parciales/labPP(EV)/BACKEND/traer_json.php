<?php

       $a = fopen("./perro.json","r");

        $arrayObj=array();
        $linea='';
        while(!feof($a))
        {
        $linea= trim(fgets($a));
        if($linea=="")
        {
            continue;
        }
        $obj = json_decode($linea);
        array_push($arrayObj,$obj);
        }

        fclose($a);

        echo json_encode($arrayObj);
?>