
import { Template } from "./Template";

export class FilterMapDivReduce extends Template{

    /**
     * Constructr de la clase FilterMapDivReduce
     * @param list lista sobre la que se realizarán los pasos definidos en el run
     */
    constructor(list:number[]){
        super(list);
    }

    /**
     * funcion que un valor inicial acumula el resulado de dividirle cada elemnto de la lista
     * @param initialValue valor inicial del acumulador
     * @returns retorna el valor de aplicar la funcion pasada a la lista con el valor inicial del acumulador
     */
    protected reduce(initialValue:number) {
        let sol:number = initialValue;
        for(let elemento of this.list){
            sol = sol / elemento;
        }
        return sol;
    }

    /**
     * Funcion hook que se ejecuta en el run despues de aplicar el map y el filter
     */
    protected despuesDeFilterMap(){
        console.log("Después de Fitrar y mapear la lista queda asi: " + this.list);
    }

    /**
     * Funcion hook que se ejecuta en el run despues de aplicar el reduce
     */
    protected despuesDeReduce(){
        console.log("Después de reduce el valor final será : " + this.resultado);

    }

}