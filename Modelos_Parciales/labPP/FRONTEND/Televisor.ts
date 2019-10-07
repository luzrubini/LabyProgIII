/// <reference path="./Producto.ts" />

namespace Entidades {
    export class Televisor extends Producto {
        protected _tipo : string;
        protected _paisOrigen : string;
        protected _pathFoto : string;

        public constructor(codigo: number, marca: string, precio : number, tipo: string, pais : string, path : string) {
            super(codigo, marca, precio);
            this._tipo = tipo;
            this._pathFoto = path;
            this._paisOrigen = pais;
        }

        public ToJson() : any {
            let auxToString = '{'+this.ToString() + ',"tipo":"'+ this._tipo +'","paisOrigen":"'+this._marca+'","pathFoto": "'+this._pathFoto+'"}';
            return JSON.parse(auxToString);
        }
    }
}