/// <reference path="./Ente.ts" />

namespace Entidades {
    export class Alien extends Ente {
        protected _raza : string;
        protected _planetaOrigen : string;
        protected _pathFoto : string;

        public constructor(cuadrante: string, edad: number, altura : number, raza: string, planeta : string, path : string) {
            super(cuadrante, edad, altura);
            this._raza = raza;
            this._pathFoto = path;
            this._planetaOrigen = planeta;
        }

        public ToJson() : any {
            let auxToString = '{'+this.ToString() + ',"raza":"'+ this._raza +'","planetaOrigen":"'+this._planetaOrigen+'","pathFoto": "'+this._pathFoto+'"}';
            return JSON.parse(auxToString);
        }
    }
}