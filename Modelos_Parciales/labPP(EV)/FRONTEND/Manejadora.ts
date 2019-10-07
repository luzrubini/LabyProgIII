
///<reference path="Perro.ts"/>
namespace PrimerParcial
{
    export interface IParte2 
    {
    
      EliminarPerro(cadenaJson :any);
      ModificarPerro(cadenaJson:any);
      ObtenerPerrosPorTamaño();

    }
    export class Manejadora implements IParte2
    {
        public   ObtenerPerrosPorTamaño() 
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let form : FormData = new FormData();
 
            form.append('op', "traer");
 
 
            xhr.open('POST', './BACKEND/traer_bd.php', true);
 
            xhr.setRequestHeader("enctype", "multipart/form-data");
 
            xhr.send(form);
 
            xhr.onreadystatechange = () => {
 
               if (xhr.readyState == 4 && xhr.status == 200) 
                {
                    //recupero la cadena y convierto a array de json
                    let arrayJson =JSON.parse(xhr.responseText);
                    let arrayTamaños =[];
                    for(let i =0;i<arrayJson.length;i++)
                    {
                       
                    }
        
                };
            }
       }
        
      public  ModificarPerro(cadenaJson: any) 
        {
            (<HTMLInputElement> document.getElementById("tamaño")).value=cadenaJson.tamanio;
            (<HTMLInputElement> document.getElementById("edad")).value=cadenaJson.edad;
            (<HTMLInputElement> document.getElementById("precio")).value=cadenaJson.precio;
            (<HTMLInputElement> document.getElementById("precio")).disabled=true;
            (<HTMLInputElement> document.getElementById("nombre")).value=cadenaJson.nombre;
            (<HTMLSelectElement> document.getElementById("raza")).value=cadenaJson.raza; 

            let path :string="";

            if( cadenaJson.pathFoto.indexOf("MODIFICADA")==-1)
            {
                path="./BACKEND/fotos/"+cadenaJson.pathFoto;
            }
            else
            {
                path="./BACKEND/fotos_modificadas/"+cadenaJson.pathFoto;
            }

            //hay que cambiar el "src" para que sepa donde buscar la foto 
            (<HTMLImageElement> document.getElementById("imgFoto")).src = path;

            (<HTMLInputElement> document.getElementById("btnAgregarBd")).value ="Modificar BD";
            //(<HTMLInputElement> document.getElementById("btn")).className="btn btn-warning";

            localStorage.setItem("modificar","true");
        }
        //metodo de la interfaz
        public   EliminarPerro(cadenaJson :any) 
        {
         if(confirm("Esta seguro que desea eliminar al perro de nombre "+cadenaJson.nombre+ " y raza " + cadenaJson.raza ))
         {
          let xhr : XMLHttpRequest = new XMLHttpRequest();
      
          let form : FormData = new FormData();
      
          form.append('cadenaJson',JSON.stringify(cadenaJson));
      
          form.append('op', "eliminar_bd");
      
          xhr.open('POST', './BACKEND/eliminar_bd.php', true);
      
          xhr.setRequestHeader("enctype", "multipart/form-data");
      
          xhr.send(form);
      
          xhr.onreadystatechange = () => {
      
              if (xhr.readyState == 4 && xhr.status == 200) {
                //alert(xhr.responseText);
                console.log("perro eliminado");
                (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/fotos/huella_default.png";
                Manejadora.MostrarPerrosBaseDatos();
          
              }
          };
         }
         else
         {
             alert("Accion cancelada");
         }
           
           
        }
        public static AgregarPerroJSON()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let tamaño : string =(<HTMLInputElement> document.getElementById("tamaño")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let precio : string =(<HTMLInputElement> document.getElementById("precio")).value;
            let nombre : string =(<HTMLInputElement> document.getElementById("nombre")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value; 


            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];

            let direccion:string='./BACKEND/agregar_json.php';
            
            let perro = new Entidades.Perro(tamaño,parseInt(edad),parseFloat(precio),nombre,raza,pathFoto);

            let form : FormData = new FormData();

            form.append('foto',foto.files[0]);
            form.append('cadenaJson',perro.ToJson());

            xhr.open('POST', direccion, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) 
                {
                    let retJSON = JSON.parse(xhr.responseText);

                   // if(!retJSON.Ok)
                    if(!retJSON.Ok)
                    {
                        console.error("NO se subió la foto!!!");
                    }
                    else{
                        //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                        console.info("Foto subida OK!!!");
                        
                        //direccion de donde se encuentra la foto
                        let path :string="./BACKEND/"+retJSON.pathFoto;
                        //hay que cambiar el "src" para que sepa donde buscar la foto 
                        (<HTMLImageElement> document.getElementById("imgFoto")).src = path;
                        console.log(path);
                    }
                }
            };

        }

        public static MostrarPerrosJSON()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let form : FormData = new FormData();
 
            form.append('op', "traer");
 
 
            xhr.open('POST', './BACKEND/traer_json.php', true);
 
            xhr.setRequestHeader("enctype", "multipart/form-data");
 
            xhr.send(form);
 
            xhr.onreadystatechange = () => {
 
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                //recupero la cadena y convierto a array de json
              let arrayJson =JSON.parse(xhr.responseText) ;
 
              let tabla:string ="";
              tabla+= "<table border=1>";
              tabla+= "<thead>";
              tabla+= "<tr>";
              tabla+= "<td>Tamaño</td>";
              tabla+= "<td>Edad</td>";
              tabla+= "<td>Precio</td>";
              tabla+= "<td>Nombre</td>";
              tabla+= "<td>Raza</td>";
              tabla+= "<td>Foto</td>";
              tabla+= "</tr>";
              tabla+= "</thead>";
 
 
             for(let i=0 ;i<arrayJson.length ;i++ )
             {          
                 tabla+= "<tr>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].tamanio;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].edad;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].precio;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].nombre;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].raza;
                 tabla+= "</td>";
 
                 tabla+="<td>";
 

 
                 //compruebo si existe la imagen
                 var img = new Image();
                 let path : string = arrayJson[i].pathFoto ; 
                 img.src ="./BACKEND/fotos/"+ path ; 
 
         
                tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";

 

                 tabla+="</td>";


                 tabla+="</tr>"; 
 
             }
             tabla+="</table>";
 
            (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=tabla;
            }
            };
 
        }

        public static AgregarPerroEnBaseDatos()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let tamaño : string =(<HTMLInputElement> document.getElementById("tamaño")).value;
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let precio : string =(<HTMLInputElement> document.getElementById("precio")).value;
            let nombre : string =(<HTMLInputElement> document.getElementById("nombre")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value; 


            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];

            
            let perro = new Entidades.Perro(tamaño,parseInt(edad),parseFloat(precio),nombre,raza,pathFoto);

            let direccion:string='./BACKEND/agregar_bd.php';

            let form : FormData = new FormData();

            form.append('foto',foto.files[0]);
            form.append('cadenaJson',perro.ToJson());

            if(localStorage.getItem("modificar") == "true")
            {
                direccion='./BACKEND/modificar_bd.php';
                
            }

            xhr.open('POST', direccion, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) 
                {
                    let retJSON = JSON.parse(xhr.responseText);

                    if(localStorage.getItem("modificar") == "true")
                    {
                       if(!retJSON.Ok)
                       {
                           alert("No se pudo modificar!");
                           console.log("No se pudo modificar!");
                       }
                       else
                       {
                           Manejadora.MostrarPerrosBaseDatos();
                       }
                       (<HTMLInputElement> document.getElementById("btnAgregarBd")).value = "Agregar BD";
                       (<HTMLInputElement> document.getElementById("precio")).disabled=false;
                       localStorage.clear();
                       Manejadora.LimpiarCampos();
                    }
                    else
                    {
                        if(!retJSON.Ok)
                        {
                            console.error("NO se subió la foto!!!");
                        }
                        else{
                            //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                            console.info("Foto subida OK!!!");
                            
                            //direccion de donde se encuentra la foto
                            let path :string="./BACKEND/"+retJSON.pathFoto;
                            //hay que cambiar el "src" para que sepa donde buscar la foto 
                            (<HTMLImageElement> document.getElementById("imgFoto")).src = path;
                            console.log(path);
                       }
                    }

                   

                   // if(!retJSON.Ok)

                }
            };

        }


        public static MostrarPerrosBaseDatos()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();

            let form : FormData = new FormData();
 
            form.append('op', "traer");
 
 
            xhr.open('POST', './BACKEND/traer_bd.php', true);
 
            xhr.setRequestHeader("enctype", "multipart/form-data");
 
            xhr.send(form);
 
            xhr.onreadystatechange = () => {
 
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                //recupero la cadena y convierto a array de json
              let arrayJson =JSON.parse(xhr.responseText) ;
 
              let tabla:string ="";
              tabla+= "<table border=1>";
              tabla+= "<thead>";
              tabla+= "<tr>";
              tabla+= "<td>Tamaño</td>";
              tabla+= "<td>Edad</td>";
              tabla+= "<td>Precio</td>";
              tabla+= "<td>Nombre</td>";
              tabla+= "<td>Raza</td>";
              tabla+= "<td>Foto</td>";
              tabla+= "<td>Acciones</td>";
              tabla+= "</tr>";
              tabla+= "</thead>";
 
 
             for(let i=0 ;i<arrayJson.length ;i++ )
             {          
                 tabla+= "<tr>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].tamanio;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].edad;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].precio;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].nombre;
                 tabla+= "</td>";
 
                 tabla+= "<td>";
                 tabla+= arrayJson[i].raza;
                 tabla+= "</td>";
 
                 tabla+="<td>";
 

                if( arrayJson[i].pathFoto.indexOf("MODIFICADA")==-1)
                {
                    tabla+="<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                }
                else
                {
                    tabla+="<img src='./BACKEND/fotos_modificadas/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                }



              tabla+="</td>";
              let objJson :string= JSON.stringify(arrayJson[i]);

              tabla+= "<td><input type='button' onclick='new PrimerParcial.Manejadora().EliminarPerro("+(objJson)+")' value='Eliminar'</td>";
              tabla+= "<td><input type='button' onclick='new PrimerParcial.Manejadora().ModificarPerro("+(objJson)+")' value='Modificar'</td>";



                 tabla+="</tr>"; 
 
             }
             tabla+="</table>";
 
            (<HTMLInputElement>document.getElementById("divTabla")).innerHTML=tabla;
            }
            };
 


        }


        public static VerificarExistencia()
        {
            let xhr : XMLHttpRequest = new XMLHttpRequest();
            let edad : string =(<HTMLInputElement> document.getElementById("edad")).value;
            let raza : string = (<HTMLSelectElement> document.getElementById("raza")).value; 
        

           

            let form : FormData = new FormData();
 
            form.append('op', "traer");
 
 
            xhr.open('POST', './BACKEND/traer_bd.php', true);
 
            xhr.setRequestHeader("enctype", "multipart/form-data");
 
            xhr.send(form);
 
            xhr.onreadystatechange = () => 
            {
 
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                let flag:boolean=false;
                let arrayJson =JSON.parse(xhr.responseText) ;
                for(let i=0;i<arrayJson.length;i++)
                {
                    let edad2 = arrayJson[i].edad;
                    if(arrayJson[i].raza== raza && edad2.toString() == edad)
                    {
                        flag=true;
                        break;
                    }

                }

                if(flag==true)
                {
                    console.log("El perro ya existe");
                    alert("El perro existe");
                }
                else
                {
                    Manejadora.AgregarPerroEnBaseDatos();
                }

            }
           };

        }

       public static LimpiarCampos()
        {
            (<HTMLInputElement> document.getElementById("tamaño")).value="";
            (<HTMLInputElement> document.getElementById("edad")).value="";
            (<HTMLInputElement> document.getElementById("precio")).value="";
            (<HTMLInputElement> document.getElementById("nombre")).value="";
            //direccion de donde se encuentra la foto
            let path :string="./BACKEND/fotos/huella_default.png";
            //hay que cambiar el "src" para que sepa donde buscar la foto 
            (<HTMLImageElement> document.getElementById("imgFoto")).src = path;
            
        }

 
    }

}