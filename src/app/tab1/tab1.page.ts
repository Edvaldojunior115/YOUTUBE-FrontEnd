import { Component, OnInit} from '@angular/core';
import { Usuarios } from '../interfaces/interfaces';
import { UsuariosService } from '../services/usuarios.service';
import { CapturarUserService } from '../services/capturarUser.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  usuario: Usuarios [] = [];
  
    
  constructor( private usuairosBDService: UsuariosService,
               private capturaUser: CapturarUserService) {}


      ngOnInit(){

         this.usuairosBDService.getUsuariosBD().subscribe( usuarioBD => {
          this.usuario.push(...usuarioBD.result);
        },
        (error) =>{

          console.log(error);

        });
      }

      //pasamos el id del usuario al cual se hizo click en la pantalla
      onClick(index: number){

          this.capturaUser.getDatosUserCapturado(this.usuario[index]);
        // console.log('USUARIO CLICKADO: ',this.usuario[index]);
      }

      
}