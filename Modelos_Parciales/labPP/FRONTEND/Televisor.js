"use strict";
/// <reference path="./Producto.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, pais, path) {
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this._tipo = tipo;
            _this._pathFoto = path;
            _this._paisOrigen = pais;
            return _this;
        }
        Televisor.prototype.ToJson = function () {
            var auxToString = '{' + this.ToString() + ',"tipo":"' + this._tipo + '","paisOrigen":"' + this._marca + '","pathFoto": "' + this._pathFoto + '"}';
            return JSON.parse(auxToString);
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Televisor.js.map