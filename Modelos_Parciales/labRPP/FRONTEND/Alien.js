"use strict";
/// <reference path="./Ente.ts" />
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
    var Alien = /** @class */ (function (_super) {
        __extends(Alien, _super);
        function Alien(cuadrante, edad, altura, raza, planeta, path) {
            var _this = _super.call(this, cuadrante, edad, altura) || this;
            _this._raza = raza;
            _this._pathFoto = path;
            _this._planetaOrigen = planeta;
            return _this;
        }
        Alien.prototype.ToJson = function () {
            var auxToString = '{' + this.ToString() + ',"raza":"' + this._raza + '","planetaOrigen":"' + this._planetaOrigen + '","pathFoto": "' + this._pathFoto + '"}';
            return JSON.parse(auxToString);
        };
        return Alien;
    }(Entidades.Ente));
    Entidades.Alien = Alien;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Alien.js.map