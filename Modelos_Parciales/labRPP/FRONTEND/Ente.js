"use strict";
var Entidades;
(function (Entidades) {
    var Ente = /** @class */ (function () {
        function Ente(cuadrante, edad, altura) {
            this._cuadrante = cuadrante;
            this._edad = edad;
            this._altura = altura;
        }
        Ente.prototype.ToString = function () {
            return '"cuadrante":"' + this._cuadrante + '","edad": ' + this._edad + ',"altura":' + this._altura;
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Ente.js.map