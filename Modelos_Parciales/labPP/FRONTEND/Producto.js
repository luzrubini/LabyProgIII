"use strict";
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(codigo, marca, precio) {
            this._codigo = codigo;
            this._marca = marca;
            this._precio = precio;
        }
        Producto.prototype.ToString = function () {
            return '"codigo":' + this._codigo + ',"marca":"' + this._marca + '","precio":' + this._marca;
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Producto.js.map