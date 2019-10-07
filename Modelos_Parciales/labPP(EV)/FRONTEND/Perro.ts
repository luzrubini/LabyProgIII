
/*
Perro, hereda de Mascota, posee como atributos nombre (cadena), raza (cadena) y pathFoto (cadena). Un constructor para
inicializar los atributos. Un método ToJSON():JSON, que retornará la representación del objeto en formato JSON. Se debe de
reutilizar el método ToString de la clase Mascota
*/

///<reference path="Mascota.ts"/>

namespace Entidades
{
    export class Perro extends Mascota
    {
        public nombre:string;
        public raza:string;
        public pathFoto:string;

        public constructor(tamaño:string,edad:number,precio:number,nombre:string,raza:string,path:string)
        {
            super(tamaño,edad,precio);

            this.nombre=nombre;
            this.raza=raza;
            this.pathFoto=path;
       }
    
       public ToJson():string
       {
           return `{"nombre":"${this.nombre}","raza":"${this.raza}","pathFoto":"${this.pathFoto}",${this.ToString()}}`;
       }

    }
}