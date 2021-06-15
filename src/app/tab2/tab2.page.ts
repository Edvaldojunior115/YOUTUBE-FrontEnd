import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { Usuarios } from '../interfaces/interfaces';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

 usuario = {
   id: '',
  legajo: '',
  nombre: '',
  apellido:'',
  email: '',
  password:'',
  role: ''
 };

  constructor( private usuarioService: UsuariosService, private alertController: AlertController) {

  }

      ngOnInit(){
        // this.usuairosBDService.getUsuariosBD().subscribe( usaurioBD => {
          
        // });

      } 

      crearUsuario(){

         this.usuarioService.RegistrarUsuario(this.usuario).subscribe( usuarioBD => {
            const message = '¡'+usuarioBD.message+'!';
            this.presentAlert(message);
        });
        
      }

      async Actualizar(){
        
          const alert = await this.alertController.create({
            header: 'INGRESAR DATOS A ACTUALIZAR:',
            inputs: [
              {
                name: 'legajo',
                type: 'text',
                id: 'id-Legajo',
                placeholder: 'Ingresar Legajo'
              },
              {
                name: 'nombre',
                type: 'text',
                id: 'id-nombre',
                placeholder: 'Ingresar Nombre'
              },
              // multiline input.
              {
                name: 'apellido',
                id: 'id-apellido',
                type: 'text',
                placeholder: 'Ingresar Apellido'
              },
              {
                name: 'email',
                type: 'email',
                id: 'id-email',
                placeholder: 'ejemplo@gmail.com'
              }
            ],
            buttons: [
              {
                text: 'Ok',
                handler: (user: Usuarios) => {
                                  
                    this.usuarioService.getUsuarioBD(user.legajo).subscribe(resp => {
                      
                      if(resp.ok == true){
                    

                            this.usuarioService.ActualizarUsuario(user).subscribe( respActualizacion =>{
                            this.presentAlert(respActualizacion.message);

                        },(err)=>{

                          console.log(err);

                        });

                      }else{
                          this.presentAlert(resp.message);
                      }
                    }, (err) =>{

                      console.log(err);
                    
                    });         
                }
              },
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'btnAlertCancelar',
              }
            ]
          });
      
          await alert.present();
        }


     async Borrar(){
        
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Ingresar Legajo del Usuario a Eliminar: ',
            inputs: [
                {
                  name: 'legajo',
                  type: 'text',
                  id: 'id-Legajo',
                  placeholder: 'Ingresar Legajo'
                }],
            buttons: [{
                  text: 'Ok',
                  handler: (user: Usuarios) =>{

                    this.AlertConfirmarBorrado(user.legajo);                
                  }
                },
                {
                text:'Cancelar',
                role: 'Cancelar',
                cssClass: 'btnAlertCancelar'
              }]
          });
      
          await alert.present();

      }

     







/**
 *Método para mostrar un mensaje por pantalla al usuario de éxito o no éxito
 *de la operación realizada.
*/
      async presentAlert(message: string) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'SE INFORMA QUE:',
        message,
        buttons: ['OK']
      });
      await alert.present();
      }


      async AlertConfirmarBorrado(legajo: string) {
        const alert = await this.alertController.create({
          backdropDismiss: false,
          header: '¡ATENCIÓN!',
          message: '¿Estás seguro que desea eliminar ese registro?',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.usuarioService.EliminarUsuario(legajo).subscribe(resp =>{
                  this.presentAlert(resp.message);
                },(err) =>{

                  console.log(err);

                });

              }
            },
            {
              text: 'Cancelar',
              role: 'Cancelar',
              cssClass: 'btnAlertCancelar'
            }]
        });
        await alert.present();
      }
  }


