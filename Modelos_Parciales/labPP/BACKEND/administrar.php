<?php
$caso = isset($_POST["caso"]) ? $_POST["caso"] : null;

//var_dump($caso);
sleep(1);

switch ($caso) {

    case 'agregar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
             
        $ar = fopen("./televisores.json", "a");
		
		$cant = fwrite($ar, $cadenaJSON . "\r\n");

        fclose($ar);

        $resultado["TodoOK"] = $cant > 0 ? true : false;

        $pathOrigen = $_FILES['foto']['tmp_name'];   
        
        $objJson = json_decode($cadenaJSON);    
        //echo($cadenaJSON); die();   
        $pathDestino = "./fotos/".$objJson->pathFoto;
        
        move_uploaded_file($pathOrigen, $pathDestino);

        echo json_encode($resultado);
    break;

    case 'traer':
    
        $a = fopen("./televisores.json", "r");

        $string = "";

        while(!feof($a)){
        
            $linea = trim(fgets($a));
        
            if(strlen($linea) > 0)
                $string .=  $linea . ',';        
        }
        
        fclose($a);

        $string = substr($string, 0, strlen($string)-1);        
        
        echo ('['.$string.']');
        
    break;

    case 'eliminar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $a = fopen("./televisores.json","r");

        $string = '';

        while(!feof($a)){
            $linea = trim(fgets($a));
            
            if(strlen($linea) > 0){
                $vec = explode(",", $linea);
                $codigo = explode(":", $vec[0])[1];//Obtiene el valor del código. Colocar el valor sin comillas!!!
                
                if($codigo == $obj->codigo){
                    continue;
                }
                $string .= $linea . "\r\n";
            }         
        }

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./televisores.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        if($cant < 1){
            $objRetorno->TodoOK = FALSE;
        }

        echo json_encode($objRetorno);        
        
    break;

    case 'modificar':

        $cadenaJSON = isset($_POST['cadenaJson']) ? $_POST['cadenaJson'] : null;
        $obj = json_decode($cadenaJSON);

        $a = fopen("./televisores.json","r");

        $string = '';

        while(!feof($a)){
            $linea = trim(fgets($a));
            
            if(strlen($linea) > 0){
                $vec = explode(",", $linea);
                $codigo = explode(":", $vec[0])[1];//Obtiene el valor del código. Colocar el valor sin comillas!!!
                
                if($codigo == $obj->codigo){
                    continue;
                }
                $string .= $linea . "\r\n";
            }         
        }

        $string .=  $cadenaJSON . "\r\n";

        fclose($a);

        $objRetorno = new stdClass();
        $objRetorno->TodoOK = TRUE;

        $a = fopen("./televisores.json","w");
        
        $cant = fwrite($a, $string);

        fclose($a);

        if($cant < 1){
            $objRetorno->TodoOK = FALSE;
        }

        $pathOrigen = $_FILES['foto']['tmp_name'];   
        
        $objJson = json_decode($cadenaJSON);    

        $pathDestino = "./fotos/".$objJson->pathFoto;
        
        move_uploaded_file($pathOrigen, $pathDestino);

        echo json_encode($objRetorno);        

    break;

    case "paises":
    
        $a = fopen("./paises.json","r");
        $paises = fread($a, filesize("./paises.json"));
        fclose($a);

        echo ($paises);

    break;

    default:
        echo ":(";
        break;
}