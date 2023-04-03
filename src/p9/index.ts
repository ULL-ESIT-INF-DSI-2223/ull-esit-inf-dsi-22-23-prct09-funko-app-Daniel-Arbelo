import chalk from "chalk";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {FunkoType} from "./FunkoPop.js"
import {FunkoPop} from "./FunkoPop.js"
import {FunkoGenre} from "./FunkoPop.js"
import * as fs from 'fs';

yargs(hideBin(process.argv))
  .command('add', 'Adds a funko', { /**************comando add **************/
  user:{
    description: 'Nombre del Usuario',
    type: 'string',
    demandOption: true
  },
  id: {
   description: 'Funko ID',
   type: 'number',
   demandOption: true
  },
  name:{
    description: 'nombre del funko',
    type: 'string',
    demandOption: true
  },
  desc:{
    description: 'descripcion del funko',
    type: 'string',
    demandOption: true
  },
  type:{
    description: 'tipo de funko',
    type: 'string',
    demandOption: true
  },
  genre:{
    description: 'genero de funko',
    type: 'string',
    demandOption: true
  },
  franchise:{
    description: 'franquicia de funko',
    type: 'string',
    demandOption: true
  },
  number:{
    description: 'numero identificativo del funko',
    type: 'number',
    demandOption: true
  },
  exclusive:{
    description: 'valor booleano para saber si es exclusivo',
    type: 'boolean',
    demandOption: true
  },
  specialFeatures:{
    description: 'Caracteristicas especiales',
    type: 'string',
    demandOption: false
  },
  marketValue:{
    description: 'valor de mercado',
    type: 'number',
    demandOption: true
  }
 }, (argv) => {
  let features = (argv.specialFeatures != undefined? argv.specialFeatures:"");

  let type:FunkoType;
  switch(argv.type){
    case "POP":
      type = FunkoType.POP;
      break;
    case "POP_RIDES":
      type = FunkoType.POP_RIDES;
      break;
    
    case "VINYL_SODA":
      type = FunkoType.VINYL_SODA;
      break;
    
    case "VINYL_GOLD":
      type = FunkoType.VINYL_GOLD;
      break;
    
    default:
      type = FunkoType.POP;
      break;
    
  }

  let genre:FunkoGenre;
  switch(argv.genre){
    case "ANIMATION":
      genre = FunkoGenre.ANIMATION;
      break;
    case "MOVIES_AND_TV":
      genre = FunkoGenre.MOVIES_AND_TV;
      break;
    
    case "VIDEOGAMES":
      genre = FunkoGenre.VIDEOGAMES;
      break;
    
    case "SPORTS":
      genre = FunkoGenre.SPORTS;
      break;

    case "MUSIC":
      genre = FunkoGenre.MUSIC;
      break;
    
    case "ANIME":
      genre = FunkoGenre.ANIME;
      break;

    default:
      genre = FunkoGenre.ANIMATION;
      break;
    
  }

  let newFunko = new FunkoPop("id-"+argv.id, argv.name, argv.desc, type, genre, argv.franchise, argv.number, argv.exclusive, features, argv.marketValue);
  // Ahora se escribe en el dir que se encuentra en la raiz del proyecto Funkos/nombreUsuario/ficheroFunko.json
  //
  fs.mkdir("Funkos/" + argv.user, (err) => {
    if(err) {
        console.log(chalk.green("El dir del usuario ya estaba creado"));
    }else{
        console.log(chalk.green("Directorio de Usuario Creado"));
    }
  });

  // Se crea la ruta del fichero y se escribe en formato json la infor del funko
  let RutayNombreFichero:string =  "Funkos/"+ argv.user + "/" +  "id-" + argv.id + ".json"; 
  
  fs.writeFile(RutayNombreFichero,  JSON.stringify(newFunko), (err) => {
    console.log(chalk.green('Nuevo Funko creado'));
  });
  
 })
 .command('read', 'Muestra la información del funko seleccionado', { /**************comando read **************/
  user:{
    description: 'Nombre del Usuario',
    type: 'string',
    demandOption: true
  },
  id:{
    description: 'Id del funko a eliminar',
    type: 'number',
    demandOption: true
  }
 },
 (argv) => {
  let idEncontrado:boolean = false;
  // Recorre los ficheros del usuario imprimiendo los diferentes funkos de este
  fs.readdir("Funkos/" + argv.user, function(err,archivos) {
    if(err){
      console.log(chalk.red(err));
      return
    }
    // Recorrer los archivos
    archivos.forEach((archivo) =>{
      fs.readFile("Funkos/" + argv.user + "/" + archivo, (_, data) => {
        let funkoJson = JSON.parse(data.toString());
        if(funkoJson._id == "id-" + argv.id){
          idEncontrado = true;
          let funkoJson = JSON.parse(data.toString());
          console.log("ID: " + chalk.green(funkoJson._id));
          console.log("NAME: " + chalk.green(funkoJson._name));
          console.log("DESCRIPTION: " + chalk.green(funkoJson._description));
          console.log("TYPE: " + chalk.green(funkoJson._type));
          console.log("GENRE: " + chalk.green(funkoJson._genre));
          console.log("FRANCHISE: " + chalk.green(funkoJson._franchise));
          console.log("NUBER: " + chalk.green(funkoJson._number));
          console.log("EXCLUSIVE: " + chalk.green(funkoJson._exclusive));
          if(funkoJson._specialFeatures != "")
            console.log("ID: " + chalk.green(funkoJson._specialFeatures));
          
          // Valor de mercado
          if(funkoJson._marketValue >= 200){
            console.log("MARKET VALUE: " + chalk.green(funkoJson._marketValue));
          } else if(funkoJson._marketValue >= 100 && funkoJson._marketValue < 200){
            console.log("MARKET VALUE: " + chalk.blue(funkoJson._marketValue));
          }else if(funkoJson._marketValue >= 50 && funkoJson._marketValue < 100){
            console.log("MARKET VALUE: " + chalk.yellow(funkoJson._marketValue));
          }else if( funkoJson._marketValue < 50){
            console.log("MARKET VALUE: " + chalk.red(funkoJson._marketValue));
          }
        }
      })
    });
    
  })
  // Se utiliza setTimeout para evitar que ejecute los condicionales antes que el fs.readfile
  setTimeout(() => {
    if(idEncontrado == false){
      console.log(chalk.red("Funko not found at " + argv.user + " collection!"));
    }
  }, 200);
  
  
 })
 .command('list', 'Lista de funkos de un usuario', { /**************comando list **************/
  user:{
    description: 'Nombre del Usuario',
    type: 'string',
    demandOption: true
  }
 },
 (argv) => {

  // Recorre los ficheros del usuario imprimiendo los diferentes funkos de este
  fs.readdir("Funkos/" + argv.user, function(err,archivos) {
    if(err){
      console.log(err);
      return
    }
    console.log(chalk.green(argv.user + " Funko Pop Collection"));
    console.log(chalk.black("--------------------------------"));
    archivos.forEach((archivo) =>{
      fs.readFile("Funkos/" + argv.user + "/" + archivo, (_, data) => {
        let funkoJson = JSON.parse(data.toString());
        console.log("ID: " + chalk.green(funkoJson._id));
        console.log("NAME: " + chalk.green(funkoJson._name));
        console.log("DESCRIPTION: " + chalk.green(funkoJson._description));
        console.log("TYPE: " + chalk.green(funkoJson._type));
        console.log("GENRE: " + chalk.green(funkoJson._genre));
        console.log("FRANCHISE: " + chalk.green(funkoJson._franchise));
        console.log("NUBER: " + chalk.green(funkoJson._number));
        console.log("EXCLUSIVE: " + chalk.green(funkoJson._exclusive));
        if(funkoJson._specialFeatures != "")
          console.log("ID: " + chalk.green(funkoJson._specialFeatures));
        
        // Valor de mercado
        if(funkoJson._marketValue >= 200){
          console.log("MARKET VALUE: " + chalk.green(funkoJson._marketValue));
        } else if(funkoJson._marketValue >= 100 && funkoJson._marketValue < 200){
          console.log("MARKET VALUE: " + chalk.blue(funkoJson._marketValue));
        }else if(funkoJson._marketValue >= 50 && funkoJson._marketValue < 100){
          console.log("MARKET VALUE: " + chalk.yellow(funkoJson._marketValue));
        }else if( funkoJson._marketValue < 50){
          console.log("MARKET VALUE: " + chalk.red(funkoJson._marketValue));
        }

      })
    });
  })
 })
 .command('update', 'Actualiza un funco cambiando los argumentos que se le pasen', { /**************comando update **************/
  user:{
    description: 'Nombre del Usuario',
    type: 'string',
    demandOption: true
  },
  id:{
    description: 'Id del funko a eliminar',
    type: 'number',
    demandOption: true
  },
  name:{
    description: 'nombre del funko',
    type: 'string',
    demandOption: false
  },
  desc:{
    description: 'descripcion del funko',
    type: 'string',
    demandOption: false
  },
  type:{
    description: 'tipo de funko',
    type: 'string',
    demandOption: false
  },
  genre:{
    description: 'genero de funko',
    type: 'string',
    demandOption: false
  },
  franchise:{
    description: 'franquicia de funko',
    type: 'string',
    demandOption: false
  },
  number:{
    description: 'numero identificativo del funko',
    type: 'number',
    demandOption: false
  },
  exclusive:{
    description: 'valor booleano para saber si es exclusivo',
    type: 'boolean',
    demandOption: false
  },
  specialFeatures:{
    description: 'Caracteristicas especiales',
    type: 'string',
    demandOption: false
  },
  marketValue:{
    description: 'valor de mercado',
    type: 'number',
    demandOption: false
  }
 },
 (argv) => {
  let idEncontrado:boolean = false;
  
  // Recorre los ficheros del usuario 
  fs.readdir("Funkos/" + argv.user, function(err,archivos) {
    if(err){
      console.log(chalk.red(err));
      return
    }
    // Recorrer los archivos
    archivos.forEach((archivo) =>{
      fs.readFile("Funkos/" + argv.user + "/" + archivo, (_, data) => {
        let funkoJson = JSON.parse(data.toString());
        if(funkoJson._id == "id-" + argv.id){
          idEncontrado = true;
          let funkoJson = JSON.parse(data.toString());
          console.log("ID: " + chalk.green(funkoJson._id));
          let nombre = (argv.nombre != undefined? argv.nombre:funkoJson._name);
          let descripcion = (argv.desc != undefined? argv.desc:funkoJson._description);
          let franchise = (argv.franchise != undefined? argv.franchise:funkoJson._franchise);
          let numero = (argv.number != undefined? argv.number:funkoJson._number);
          let exclusive = (argv.exclusive != undefined? argv.exclusive:funkoJson._exclusive);
          let specialFeatures = (argv.specialFeatures != undefined? argv.specialFeatures:funkoJson._specialFeatures);
          let valor = (argv.marketValue != undefined? argv.marketValue:funkoJson._marketValue);

          let type:FunkoType;
          switch(argv.type){
            case "POP":
              type = FunkoType.POP;
              break;
            case "POP_RIDES":
              type = FunkoType.POP_RIDES;
              break;
            
            case "VINYL_SODA":
              type = FunkoType.VINYL_SODA;
              break;
            
            case "VINYL_GOLD":
              type = FunkoType.VINYL_GOLD;
              break;
            
            default:
              type = funkoJson._type;
              break;
            
          }

          let genre:FunkoGenre;
          switch(argv.genre){
            case "ANIMATION":
              genre = FunkoGenre.ANIMATION;
              break;
            case "MOVIES_AND_TV":
              genre = FunkoGenre.MOVIES_AND_TV;
              break;
            
            case "VIDEOGAMES":
              genre = FunkoGenre.VIDEOGAMES;
              break;
            
            case "SPORTS":
              genre = FunkoGenre.SPORTS;
              break;

            case "MUSIC":
              genre = FunkoGenre.MUSIC;
              break;
            
            case "ANIME":
              genre = FunkoGenre.ANIME;
              break;

            default:
              genre = funkoJson._genre;
              break;
            
          }

          let funkoModificado = new FunkoPop("id-" + argv.id, nombre, descripcion, type, genre, franchise, numero, exclusive, specialFeatures, valor);
          // Se crea la ruta del fichero y se escribe en formato json la infor del funko
          let RutayNombreFichero:string =  "Funkos/"+ argv.user + "/" + "id-" + argv.id  + ".json"; 
          
          fs.writeFile(RutayNombreFichero,  JSON.stringify(funkoModificado), (err) => {
            console.log(chalk.green('Funko modificado'));
          });
        }
      })
    });
    
  })
  // Se utiliza setTimeout para evitar que ejecute los condicionales antes que el fs.readfile
  setTimeout(() => {
    if(idEncontrado == false){
      console.log(chalk.red("Funko not found at " + argv.user + " collection!"));
    }
  }, 200);
  
  
 })
 .command('remove', 'elmimina el fichero que contiene el funko pasado', { /**************comando remove **************/
  user:{
    description: 'Nombre del Usuario',
    type: 'string',
    demandOption: true
  },
  id:{
    description: 'Id del funko a eliminar',
    type: 'number',
    demandOption: true
  }
 },
 (argv) => {
  let idEncontrado:boolean = false;
  // Recorre los ficheros del usuario imprimiendo los diferentes funkos de este
  fs.readdir("Funkos/" + argv.user, function(err,archivos) {
    if(err){
      console.log(chalk.red(err));
      return
    }
    // Recorrer los archivos
    archivos.forEach((archivo) =>{
      fs.readFile("Funkos/" + argv.user + "/" + archivo, (_, data) => {
        let funkoJson = JSON.parse(data.toString());
        if(funkoJson._id == "id-" + argv.id){
          idEncontrado = true;
          fs.rm("Funkos/" + argv.user + "/" + archivo, (err) => {
            if(err)
              console.log(chalk.red(err));

            console.log(chalk.green("Funko eliminado"));
          });
        }
      })
    });
    
  })
  // Se utiliza setTimeout para evitar que ejecute los condicionales antes que el fs.readfile
  setTimeout(() => {
    if(idEncontrado == false){
      console.log(chalk.red("Funko not found at " + argv.user + " collection!"));
    }
  }, 200);
  
  
 })
 .help()
 .argv;


//console.log(chalk.red("azuuul"));
// node dist/p9/index.js add --user "Dani" --id 1 
// node dist/p9/index.js add --user "Dani" --id 1 --name "batman" --desc "super heroe sin poderes" --type "POP" --genre "MOVIES_AND_TV" --franchise "Bob Kane y Bill Finge" --number 12 --exclusive false --marketValue 33