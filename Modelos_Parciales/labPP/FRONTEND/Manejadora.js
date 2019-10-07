"use strict";
/// <reference path="./ajax.ts" />
/// <reference path="./Televisor.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function (funcionExtra) {
            var codigo = parseInt(document.getElementById("codigo").value, 10);
            var marca = document.getElementById("marca").value;
            var precio = parseFloat(document.getElementById("precio").value);
            var tipo = document.getElementById("tipo").value;
            var pais = document.getElementById("pais").value;
            var fotoInput = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            var pathFoto = (path.split('\\'))[2];
            var auxTele = new Entidades.Televisor(codigo, marca, precio, tipo, pais, pathFoto);
            var ajax = new Ajax();
            var form = new FormData();
            form.append("caso", "agregar");
            form.append("cadenaJson", JSON.stringify(auxTele.ToJson()));
            form.append("foto", fotoInput.files[0]);
            if (funcionExtra === undefined) {
                funcionExtra = Manejadora.Mostrar;
            }
            ajax.PostConArchivos('./BACKEND/administrar.php', funcionExtra, form, Manejadora.Mostrar);
        };
        Manejadora.Mostrar = function (response) {
            console.log(response);
        };
        Manejadora.MostrarTelevisores = function () {
            var ajax = new Ajax();
            var params = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.MostrarTabla, params, Manejadora.Mostrar);
        };
        Manejadora.MostrarTabla = function (response) {
            console.log(response);
            var jsonObj = JSON.parse(response);
            var auxTable = "<table border='1'><tr><th>Codigo</th><th>Marca</th><th>Precio</th><th>Tipo</th><th>PaisOrigen</th><th>Foto</th></tr><th>";
            for (var _i = 0, jsonObj_1 = jsonObj; _i < jsonObj_1.length; _i++) {
                var televisor = jsonObj_1[_i];
                auxTable += "<tr><th>" + televisor.codigo + "</th><th>" + televisor.marca + "</th><th>" + televisor.precio + "</th><th>" + televisor.tipo + "</th><th>" + televisor.paisOrigen + "</th><th>";
                if (televisor.pathFoto !== "undefined") {
                    auxTable += "<img src='./BACKEND/fotos/" + televisor.pathFoto + "' height=100 width=100 ></img>";
                }
                else {
                    auxTable += "No hay foto";
                }
                auxTable += "</th></tr>";
            }
            auxTable += "</table>";
            document.getElementById("divTabla").innerHTML = auxTable;
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var ajax = new Ajax();
            var params = "caso=traer";
            ajax.Post('./BACKEND/administrar.php', Manejadora.Guardar, params, Manejadora.Guardar);
        };
        Manejadora.Guardar = function (response) {
            localStorage.setItem("televisores_local_storage", response + ";");
        };
        Manejadora.VerificarExistencia = function () {
            var auxLocalStorage = "";
            var codigo = parseInt(document.getElementById("codigo").value, 10);
            if (localStorage.getItem("televisores_local_storage") !== "") {
                auxLocalStorage = localStorage.getItem("televisores_local_storage");
                auxLocalStorage = (auxLocalStorage.split(';'))[0];
                //console.log(auxLocalStorage);
                var auxJson = JSON.parse(auxLocalStorage);
                var puedeAgregar = true;
                for (var _i = 0, auxJson_1 = auxJson; _i < auxJson_1.length; _i++) {
                    var televisor = auxJson_1[_i];
                    if (parseInt(televisor.codigo, 10) === codigo) {
                        puedeAgregar = false;
                        break;
                    }
                }
                if (puedeAgregar) {
                    Manejadora.AgregarTelevisor(Manejadora.GuardarEnLocalStorage);
                }
                else {
                    var mensaje = "El televisor con codigo " + codigo + " ya existe.";
                    alert(mensaje);
                    console.log(mensaje);
                }
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map