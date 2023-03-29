export abstract class Template{
    protected list:number[];
    protected resultado:number;

    /**
     * Constructr de la clase Template
     * @param list lista sobre la que se realizarán los pasos definidos en el run
     */
    constructor(list:number[]){
        this.list = list;
    }

    /**
     * Establece los pasos u operaciones comunes del esqueleto algorítmico
     */
    public run(){
        // Se realiza en primer lugar un filtrado para conseguir los números mayores de 0
        this.list = this.filter((elemento) => elemento > 0);

        // Se realiza un map para que multiplique la lista positiva ya despues del filter por 2
        this.list = this.map((element) => element *2);

        // Hook
        this.despuesDeFilterMap();

        // Se realiza el reduce sobre la lista ya filtrada y mapeada
        this.resultado = this.reduce(1);

        // Hook
        this.despuesDeReduce();
    }

    /**
     * funcion que pasandole una funcion con un un acumulador inicial reduce cada elemento utilizando la funcion pasada
     * @param initialValue valor inicial del acumulador
     * @returns retorna el valor de aplicar la funcion pasada a la lista con el valor inicial del acumulador
     */
    protected abstract  reduce(initialValue:number);

    /**
     * Filtra la lista usando una funcion pasada 
     * @param funcion predicado lógico que tiene que cumplir el filtrad
     * @returns retorna una lista con los elementos que pasen el predicado lógico
     */
    protected filter(funcion:(item:number) => boolean):number[]{
        let sol:number[] = [];
        for(let elemento of this.list){
            if(funcion(elemento) == true){
                sol.push(elemento);
            }
        }
        return sol;
    }

    /**
     * Funcion que aplica la funcion dad a cada elemento de la lista 
     * @param transformar funcion a ser aplicada a cada elemento de la lista
     * @returns retorna una nueva lista resultado de haber pasado por la funcion
     */
    protected map(transformar:(item:number)=> number):number[]{
        let sol:number[] = [];
        for(let elemento of this.list){
            sol.push(transformar(elemento));
        }
        return sol;
    }

    // Hooks
    /**
     * Funcion hook que se ejecuta en el run despues de aplicar el map y el filter
     */
    protected despuesDeFilterMap(){}

    /**
     * Funcion hook que se ejecuta en el run despues de aplicar el reduce
     */
    protected despuesDeReduce(){}
    
    // Getters
    /**
     * Getter de la lista
     */
    get lista(){
        return this.list;
    }

    /**
     * getter del resultado final
     */
    get resultadoFinal(){
        return this.resultado;
    }
}