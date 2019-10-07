/*
Mascota: tamaño (cadena), edad (entero) y precio (flotante) como atributos. Un constructor que reciba tres parámetros. Un
método, ToString():string, que retorne la representación de la clase en formato cadena (preparar la cadena para que, al juntarse
con el método ToJSON, de la clase perro, forme un JSON válido).
*/

namespace Entidades
{
    export class Mascota
    {
        public tamaño:string;
        public edad:number;
        public precio:number;

        public constructor (tamaño:string,edad:number,precio:number)
        {
            this.tamaño=tamaño;
            this.edad=edad;
            this.precio=precio;
        }

        public ToString():string
        {
            return `"tamanio":"${this.tamaño}","edad":${this.edad},"precio":${this.precio}`;
        }



    }
}