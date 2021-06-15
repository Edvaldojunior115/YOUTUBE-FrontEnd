import { Injectable } from '@angular/core';
import { Usuarios } from '../interfaces/interfaces';






@Injectable({
    providedIn: 'root'
  })
  
  export class CapturarUserService {
 
    Legajo: string;
    id: string;

    getDatosUserCapturado(usuario: Usuarios){

        if(!usuario){
            console.log('ID DE USUARIO VACÍO');
        }else{

        //  console.log('Usuario que vino al servicio: ', usuario); 
         this.id = usuario.id;
         this.Legajo = usuario.legajo;
        }
                    
    }

    getIdUsuarioSeleccionado(){
     
      // console.log('LEGAJO Y ID DEL USUARIO QUE ESTAMOS CAPTURANDO EN EL SERVICIO',  this.id, this.Legajo);

      return this.id;
    }

    GetlegajoDelUserSeleccionado(){
     
      // console.log('LEGAJO Y ID DEL USUARIO QUE ESTAMOS CAPTURANDO EN EL SERVICIO',  this.id, this.Legajo);

      return this.Legajo;
    }





  }
