# Práctica 9
## Introducción
En esta práctica se implementará un programa por línea de comandos para que cada usuario cree funko pops que se almacenarán en formato json cada funko creado en un fichero, dentro de una carpeta con el nombre del usuario creada gracias al la api asíncrona de node.js para trabajar con el sistema de ficheros. 

## ESM
Para poder utilizar la última version de ESM, hay que hacer los que dice el enunciado y para poder ejecutar las pruebas, hay que cambiar todos los imports de las pruebas para que acaben en .js y en el .mocharc.json meter la siguiente linea:
```
    "node-option": ["experimental-specifier-resolution=node", "loader=ts-node/esm"],
```
Y para el cubrimiento, instalamos como dependencia c8 y sustituimos nyc por c8.

## Clase FunkoPop
En primer lugar se declara un enumerado para que almacene los tipos de funko pops que pueden haber:
```
    export enum FunkoType {
        POP = "Pop!",
        POP_RIDES = "Pop! Rides",
        VINYL_SODA = "Vinyl Soda",
        VINYL_GOLD = "Vinyl Gold",
    }
```
Luego se hace un otro enumerado para almacenar los géneros que pueden ser los funkos:
```
    export enum FunkoGenre {
        ANIMATION = "Animation",
        MOVIES_AND_TV = "Movies and TV",
        VIDEOGAMES = "Video Games",
        SPORTS = "Sports",
        MUSIC = "Music",
        ANIME = "Anime",
    }
```
Después de esto se declara la clase FunkoPop que tendrá los siguientes atributos:
```
    private _id: string;
    private _name: string;
    private _description: string;
    private _type: FunkoType;
    private _genre: FunkoGenre;
    private _franchise: string;
    private _number: number;
    private _exclusive: boolean;
    private _specialFeatures: string;
    private _marketValue: number;
```
Estos atributos se inicializan en el contructor aunque hay métodos para modificarlos todos, así como los getters.

## Index
En el index se maneja toda la parte de la gestion de la línea de comandos mediante yargs y envían mensajes de error en rojo con chalk y para los informativos en verde.
Se implementan los comandos que se piden:
### add
El comando tiene argumentos demandados todos los atributos de la clase FunkoPop, menos el de características especiales, que si no lo tine se pone vacío.
Después de esto se crea un objeto con la información pasada por línea de comandos y después se crea un directorio con el nombre del usuario, si ya existe, se imprime una advertencia de que ya existe el dir y por último se escribe el fichero .js con la información del funko. El fichero se llama id-X.js donde X es el id del funko.

### Modificar
El comando modificar es bastante parecido al add, solo que los atributos del comando no son demandados, solo el nombre del usuario y el id del funko a modificar, con esto se rellenan unas variables que creamos con los valores pasados y si no se pasa nada con el valor que tenía ya el funko. Todo esto si se encuentra el funko. Después de esto se crea un objeto con los valores modificados y los antiguos y se crea un fichero con esta información, sobreescribiendo el anterior.

### Eliminar
Para eliminar solo se pide el usuario y el id a eliminar, después de esto se recorren todos los ficheros del usuario, accediendo a los archivos y comprobando que uno coincida con el id pasado, si es así gracias a fs.rm, se elimina el archivo.

### Listar
Se le pasa el usuario y se recorren todos sus archivos con fs.readdir, que se ha utilizado en todos los comandos y se va sacando la información de cada archivo en formato .json y después se imprime formateado y con la información en verde, exeptuando el valor de mercado que si es superior a 200 se imprime en verde, si está entre 100 y 200 en azul, entre 50 y 100 en amarillo y menos de 50 en rojo

### Mostrar 
Básicamente, es lo mismo que listar pero se le pasa el id y cuando se recorren los ficheros, y si coincide el id se imprime en el mismo formato que listar, pero si no se encuentra se imprime un mensaje de error en rojo.

## Conclusión
Lo más complicado de esta práctica ha sido la parte configurar el proyecto para que utilize ESM, administrar lo que se pasa por línea de comandos con yargs, trabajar con fs para acceder al sistema de ficheros y poco más, ya que la clase ha sido bastante sencillita.