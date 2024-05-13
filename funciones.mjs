//Importaciones
import { error } from "node:console"
import fs from "node:fs"
import path from "node:path"

//raiz de index
const raiz = "publica"
const raizjson = "./saludos"

//Direcciones mimes
const diccionarioMime = {
    '.jpg':'image.jpeg',
    '.jpeg':'image.jpeg',
    '.js':'application/javascript',
    '.css':'text/css'
}



const gestionarIndex = (respuesta)=>{
    const ruta = path.join(raiz, "index.html")   //Para obtener una ruta
    fs.readFile(ruta, (err, data) => {  //leer archivo HTML (tener en cuenta el orden)
        if (err) {
          respuesta.statusCode = 404
          respuesta.error(err);
          return;
        }
        respuesta.statusCode = 200
        respuesta.setHeader('Content-Type', 'text/html')
        respuesta.end(data);  //Todo lo que leyo lo "trae"
        
    });
}

const gestionarRecurso = (peticion, respuesta) => {   
    const ruta = path.join(raiz, peticion.url)
    const extension = path.extname(peticion.url)
    fs.readFile(ruta,(error, data)=>{
        if(error){
            console.log(error)
            respuesta.statuscode = 404
            respuesta.end('Recurso no encontrado.')
        }else{
            respuesta.statuscode = 200;
            respuesta.setHeader('Content-Type', diccionarioMime[extension])
            respuesta.end(data);
        }
    })
}



const crearJson = (respuesta) => {
    
    const ruta = path.join(raizjson, "saludo.json") //Obtener ruta
    const contenido = '{"saludos" : ["Buenos dias", "Buenas tardes", "Buenas noches"]}'
    fs.writeFile(ruta,contenido,error => {  // (ruta, contenido y error <---- argumentos que deben tener en cuenta el orden)
        
        if (error) {
            respuesta.statusCode = 404;
            respuesta.error(error)
        }

        respuesta.statusCode= 200;
        respuesta.setHeader('Context-Type','application/json')
        
        
        
    });
}






export {gestionarIndex, crearJson, gestionarRecurso}