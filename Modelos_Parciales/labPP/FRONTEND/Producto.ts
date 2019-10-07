namespace Entidades {
    export class Producto {
        protected _codigo : number;
        protected _marca : string;
        protected _precio : number;

        public constructor(codigo: number, marca: string, precio : number)
        {
            this._codigo = codigo;
            this._marca = marca;
            this._precio = precio;
        }

        public ToString() : string {
            return '"codigo":'+this._codigo+',"marca":"'+this._marca+'","precio":'+this._marca;
        }
    }
}