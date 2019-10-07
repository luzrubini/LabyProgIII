/// <reference path="./ajax.ts" />
/// <reference path="./Televisor.ts" />

namespace PrimerParcial {
    export class Manejadora {
        public static AgregarTelevisor(funcionExtra? : Function) : void {
            let codigo : number = parseInt((<HTMLInputElement> document.getElementById("codigo")).value, 10);
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let precio : number = parseFloat((<HTMLInputElement> document.getElementById("precio")).value);
            let tipo : string = (<HTMLInputElement> document.getElementById("tipo")).value;
            let pais : string = (<HTMLSelectElement> document.getElementById("pais")).value; 

            let fotoInput : any =  (<HTMLInputElement> document.getElementById("foto"));
            let path : string = (<HTMLInputElement> document.getElementById("foto")).value;
            let pathFoto : string = (path.split('\\'))[2];
        
            let auxTele = new Entidades.Televisor(codigo, marca, precio, tipo, pais, pathFoto);
            
            let ajax : Ajax = new Ajax();

            let form : FormData = new FormData();
            form.append("caso","agregar");
            form.append("cadenaJson", JSON.stringify(auxTele.ToJson()));
            form.append("foto", fotoInput.files[0]);
            
            if(funcionExtra === undefined) {
                funcionExtra = Manejadora.Mostrar;
            }
            ajax.PostDataForm('./BACKEND/administrar.php', funcionExtra , form , Manejadora.Mostrar);
        }

        private static Mostrar(response : string) : void {
            console.log(response);
        }

        public static MostrarTelevisores() : void {
            let ajax : Ajax = new Ajax();
            let params : string = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.MostrarTabla, params, Manejadora.Mostrar);
        }

        private static MostrarTabla(response:string) {
            console.log(response);
            let jsonObj : any = (<any> JSON.parse(response));
            let auxTable : string = "<table border='1'><tr><th>Codigo</th><th>Marca</th><th>Precio</th><th>Tipo</th><th>PaisOrigen</th><th>Foto</th></tr><th>";

            for(let televisor of jsonObj) {
                auxTable+= "<tr><th>"+televisor.codigo+"</th><th>"+televisor.marca+"</th><th>"+televisor.precio+"</th><th>"+televisor.tipo+"</th><th>"+televisor.paisOrigen+"</th><th>";
                
                if(televisor.pathFoto !== "undefined") {
                    auxTable+="<img src='./BACKEND/fotos/" + televisor.pathFoto + "' height=100 width=100 ></img>";
                }
                else {
                    auxTable+="No hay foto";
                }

                auxTable+= "</th></tr>";
            }
            auxTable+= "</table>";
            
            (<HTMLDivElement> document.getElementById("divTabla")).innerHTML = auxTable;
        }

        public static GuardarEnLocalStorage()  : void {
            let ajax : Ajax = new Ajax();
            let params : string = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.Guardar, params, Manejadora.Guardar);
        }

        private static Guardar(response : string) {
            localStorage.setItem("televisores_local_storage", `${response};`);
            console.log("Se ha guardado en el Local Storage");
        }

        public static VerificarExistencia() : void {
            let auxLocalStorage : any = "";
            let codigo : number = parseInt((<HTMLInputElement> document.getElementById("codigo")).value, 10);

            if(localStorage.getItem("televisores_local_storage") !== "") {
                auxLocalStorage = localStorage.getItem("televisores_local_storage");
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                //console.log(auxLocalStorage);
                let auxJson : any = (<any> JSON.parse(auxLocalStorage));
                let puedeAgregar : boolean = true;

                for(let televisor of auxJson) {
                    if(parseInt(televisor.codigo,10) === codigo) {
                        puedeAgregar = false;
                        break;
                    }
                }

                if(puedeAgregar) {
                    Manejadora.AgregarTelevisor(Manejadora.GuardarEnLocalStorage);
                }
                else {
                    let mensaje : string = "El televisor con codigo "+codigo+" ya existe.";
                    alert(mensaje);
                    console.log(mensaje);
                }
            }                   
        }
    }
}