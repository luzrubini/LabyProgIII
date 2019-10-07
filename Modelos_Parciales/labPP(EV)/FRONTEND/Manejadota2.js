var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
Mascota: tamaño (cadena), edad (entero) y precio (flotante) como atributos. Un constructor que reciba tres parámetros. Un
método, ToString():string, que retorne la representación de la clase en formato cadena (preparar la cadena para que, al juntarse
con el método ToJSON, de la clase perro, forme un JSON válido).
*/
var Entidades;
(function (Entidades) {
    var Mascota = /** @class */ (function () {
        function Mascota(tamaño, edad, precio) {
            this.tamaño = tamaño;
            this.edad = edad;
            this.precio = precio;
        }
        Mascota.prototype.ToString = function () {
            return "\"tamanio\":\"" + this.tamaño + "\",\"edad\":" + this.edad + ",\"precio\":" + this.precio;
        };
        return Mascota;
    }());
    Entidades.Mascota = Mascota;
})(Entidades || (Entidades = {}));
/*
Perro, hereda de Mascota, posee como atributos nombre (cadena), raza (cadena) y pathFoto (cadena). Un constructor para
inicializar los atributos. Un método ToJSON():JSON, que retornará la representación del objeto en formato JSON. Se debe de
reutilizar el método ToString de la clase Mascota
*/
///<reference path="Mascota.ts"/>
var Entidades;
(function (Entidades) {
    var Perro = /** @class */ (function (_super) {
        __extends(Perro, _super);
        function Perro(tamaño, edad, precio, nombre, raza, path) {
            var _this = _super.call(this, tamaño, edad, precio) || this;
            _this.nombre = nombre;
            _this.raza = raza;
            _this.pathFoto = path;
            return _this;
        }
        Perro.prototype.ToJson = function () {
            return "{\"nombre\":\"" + this.nombre + "\",\"raza\":\"" + this.raza + "\",\"pathFoto\":\"" + this.pathFoto + "\"," + this.ToString() + "}";
        };
        return Perro;
    }(Entidades.Mascota));
    Entidades.Perro = Perro;
})(Entidades || (Entidades = {}));
///<reference path="Perro.ts"/>
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.prototype.ModificarPerro = function (cadenaJson) {
            document.getElementById("tamaño").value = cadenaJson.tamanio;
            document.getElementById("edad").value = cadenaJson.edad;
            document.getElementById("precio").value = cadenaJson.precio;
            document.getElementById("precio").disabled = true;
            document.getElementById("nombre").value = cadenaJson.nombre;
            document.getElementById("raza").value = cadenaJson.raza;
            var path = "";
            if (cadenaJson.pathFoto.indexOf("MODIFICADA") == -1) {
                path = "./BACKEND/fotos/" + cadenaJson.pathFoto;
            }
            else {
                path = "./BACKEND/fotos_modificadas/" + cadenaJson.pathFoto;
            }
            //hay que cambiar el "src" para que sepa donde buscar la foto 
            document.getElementById("imgFoto").src = path;
            document.getElementById("btnAgregarBd").value = "Modificar BD";
            //(<HTMLInputElement> document.getElementById("btn")).className="btn btn-warning";
            localStorage.setItem("modificar", "true");
        };
        //metodo de la interfaz
        Manejadora.prototype.EliminarPerro = function (cadenaJson) {
            if (confirm("Esta seguro que desea eliminar al perro de nombre " + cadenaJson.nombre + " y raza " + cadenaJson.raza)) {
                var xhr_1 = new XMLHttpRequest();
                var form = new FormData();
                form.append('cadenaJson', JSON.stringify(cadenaJson));
                form.append('op', "eliminar_bd");
                xhr_1.open('POST', './BACKEND/eliminar_bd.php', true);
                xhr_1.setRequestHeader("enctype", "multipart/form-data");
                xhr_1.send(form);
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState == 4 && xhr_1.status == 200) {
                        //alert(xhr.responseText);
                        console.log("perro eliminado");
                        document.getElementById("imgFoto").src = "./BACKEND/fotos/huella_default.png";
                        Manejadora.MostrarPerrosBaseDatos();
                    }
                };
            }
            else {
                alert("Accion cancelada");
            }
        };
        Manejadora.AgregarPerroJSON = function () {
            var xhr = new XMLHttpRequest();
            var tamaño = document.getElementById("tamaño").value;
            var edad = document.getElementById("edad").value;
            var precio = document.getElementById("precio").value;
            var nombre = document.getElementById("nombre").value;
            var raza = document.getElementById("raza").value;
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var direccion = './BACKEND/agregar_json.php';
            var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('cadenaJson', perro.ToJson());
            xhr.open('POST', direccion, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var retJSON = JSON.parse(xhr.responseText);
                    // if(!retJSON.Ok)
                    if (!retJSON.Ok) {
                        console.error("NO se subió la foto!!!");
                    }
                    else {
                        //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                        console.info("Foto subida OK!!!");
                        //direccion de donde se encuentra la foto
                        var path_1 = "./BACKEND/" + retJSON.pathFoto;
                        //hay que cambiar el "src" para que sepa donde buscar la foto 
                        document.getElementById("imgFoto").src = path_1;
                        console.log(path_1);
                    }
                }
            };
        };
        Manejadora.MostrarPerrosJSON = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('op', "traer");
            xhr.open('POST', './BACKEND/traer_json.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //recupero la cadena y convierto a array de json
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1>";
                    tabla += "<thead>";
                    tabla += "<tr>";
                    tabla += "<td>Tamaño</td>";
                    tabla += "<td>Edad</td>";
                    tabla += "<td>Precio</td>";
                    tabla += "<td>Nombre</td>";
                    tabla += "<td>Raza</td>";
                    tabla += "<td>Foto</td>";
                    tabla += "</tr>";
                    tabla += "</thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += arrayJson[i].tamanio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].edad;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].precio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].nombre;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].raza;
                        tabla += "</td>";
                        tabla += "<td>";
                        //compruebo si existe la imagen
                        var img = new Image();
                        var path = arrayJson[i].pathFoto;
                        img.src = "./BACKEND/fotos/" + path;
                        tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        tabla += "</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.AgregarPerroEnBaseDatos = function () {
            var xhr = new XMLHttpRequest();
            var tamaño = document.getElementById("tamaño").value;
            var edad = document.getElementById("edad").value;
            var precio = document.getElementById("precio").value;
            var nombre = document.getElementById("nombre").value;
            var raza = document.getElementById("raza").value;
            var foto = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var perro = new Entidades.Perro(tamaño, parseInt(edad), parseFloat(precio), nombre, raza, pathFoto);
            var direccion = './BACKEND/agregar_bd.php';
            var form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('cadenaJson', perro.ToJson());
            if (localStorage.getItem("modificar") == "true") {
                direccion = './BACKEND/modificar_bd.php';
            }
            xhr.open('POST', direccion, true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var retJSON = JSON.parse(xhr.responseText);
                    if (localStorage.getItem("modificar") == "true") {
                        if (!retJSON.Ok) {
                            alert("No se pudo modificar!");
                            console.log("No se pudo modificar!");
                        }
                        else {
                            Manejadora.MostrarPerrosBaseDatos();
                        }
                        document.getElementById("btnAgregarBd").value = "Agregar BD";
                        document.getElementById("precio").disabled = false;
                        localStorage.clear();
                        Manejadora.LimpiarCampos();
                    }
                    else {
                        if (!retJSON.Ok) {
                            console.error("NO se subió la foto!!!");
                        }
                        else {
                            //si el atributo "Ok" es true , mostramos la foto subida pisando la que ya estaba por default
                            console.info("Foto subida OK!!!");
                            //direccion de donde se encuentra la foto
                            var path_2 = "./BACKEND/" + retJSON.pathFoto;
                            //hay que cambiar el "src" para que sepa donde buscar la foto 
                            document.getElementById("imgFoto").src = path_2;
                            console.log(path_2);
                        }
                    }
                    // if(!retJSON.Ok)
                }
            };
        };
        Manejadora.MostrarPerrosBaseDatos = function () {
            var xhr = new XMLHttpRequest();
            var form = new FormData();
            form.append('op', "traer");
            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //recupero la cadena y convierto a array de json
                    var arrayJson = JSON.parse(xhr.responseText);
                    var tabla = "";
                    tabla += "<table border=1>";
                    tabla += "<thead>";
                    tabla += "<tr>";
                    tabla += "<td>Tamaño</td>";
                    tabla += "<td>Edad</td>";
                    tabla += "<td>Precio</td>";
                    tabla += "<td>Nombre</td>";
                    tabla += "<td>Raza</td>";
                    tabla += "<td>Foto</td>";
                    tabla += "<td>Acciones</td>";
                    tabla += "</tr>";
                    tabla += "</thead>";
                    for (var i = 0; i < arrayJson.length; i++) {
                        tabla += "<tr>";
                        tabla += "<td>";
                        tabla += arrayJson[i].tamanio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].edad;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].precio;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].nombre;
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += arrayJson[i].raza;
                        tabla += "</td>";
                        tabla += "<td>";
                        if (arrayJson[i].pathFoto.indexOf("MODIFICADA") == -1) {
                            tabla += "<img src='./BACKEND/fotos/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        }
                        else {
                            tabla += "<img src='./BACKEND/fotos_modificadas/" + arrayJson[i].pathFoto + "' height=100 width=100 ></img>";
                        }
                        tabla += "</td>";
                        var objJson = JSON.stringify(arrayJson[i]);
                        tabla += "<td><input type='button' onclick='new PrimerParcial.Manejadora().EliminarPerro(" + (objJson) + ")' value='Eliminar'</td>";
                        tabla += "<td><input type='button' onclick='new PrimerParcial.Manejadora().ModificarPerro(" + (objJson) + ")' value='Modificar'</td>";
                        tabla += "</tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var xhr = new XMLHttpRequest();
            var edad = document.getElementById("edad").value;
            var raza = document.getElementById("raza").value;
            var form = new FormData();
            form.append('op', "traer");
            xhr.open('POST', './BACKEND/traer_bd.php', true);
            xhr.setRequestHeader("enctype", "multipart/form-data");
            xhr.send(form);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var flag = false;
                    var arrayJson = JSON.parse(xhr.responseText);
                    for (var i = 0; i < arrayJson.length; i++) {
                        var edad2 = arrayJson[i].edad;
                        if (arrayJson[i].raza == raza && edad2.toString() == edad) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag == true) {
                        console.log("El perro ya existe");
                        alert("El perro existe");
                    }
                    else {
                        Manejadora.AgregarPerroEnBaseDatos();
                    }
                }
            };
        };
        Manejadora.LimpiarCampos = function () {
            document.getElementById("tamaño").value = "";
            document.getElementById("edad").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("nombre").value = "";
            //direccion de donde se encuentra la foto
            var path = "./BACKEND/fotos/huella_default.png";
            //hay que cambiar el "src" para que sepa donde buscar la foto 
            document.getElementById("imgFoto").src = path;
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
