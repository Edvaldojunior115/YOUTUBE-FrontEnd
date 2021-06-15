import { Component, OnInit } from '@angular/core';
import { SolicitudVideosService } from '../services/solicitud-videos.service.service';
import { UsuariosService} from '../services/usuarios.service';
import { Usuarios } from '../interfaces/interfaces';
import { AlertController, LoadingController } from '@ionic/angular';
import { Solicitud } from '../interfaces/interfacesSolicitud';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  loading: HTMLIonLoadingElement;

  solicitudInput = {
      id: '',
      url:'',
      autorizante:'',
      idusuario: '',
      path:'',
      descargado: ''
    };

    user = {
      legajo: ''
    }

    usuario: Usuarios [] = [];


  constructor( private solicitudVideoService: SolicitudVideosService,
               private usuariosService: UsuariosService,
               private alertController: AlertController,
               private loadingController: LoadingController) {


               }


  ngOnInit(){
   
  //  this.getSolicitudesUsuarios();

  }



  getSolicitudesUsuarios(){

    this.solicitudVideoService.getSolicitudesDeUsuario().subscribe(solicitudesBD =>{

      console.log(solicitudesBD.result);

    });
  }


  CrearSolicitud(){

  this.usuariosService.getUsuarioBD(this.user.legajo).subscribe( usuarioBD => {
    
      if(!usuarioBD){
      
        return this.presentAlert(usuarioBD.message);

      }else{
      
        usuarioBD.result.forEach(element => {

          this.solicitudInput.idusuario = element.id;
          this.solicitudInput.descargado = '0';
         
        });
      
          this.presentLoading();

          this.solicitudVideoService.CrearSolicutd(this.solicitudInput).subscribe( resultBD => {
            
            setTimeout(()=>{
              this.loading.dismiss();
              this.presentAlert(resultBD.message);
            }, 5000);       
       
           },
           (err) => {
              console.log(err);
            });
        }

      },
      (err) => {
        console.log(err);
      });

  }



  async ActualizarSolicitud(){
        
    const alert = await this.alertController.create({
      header: 'INGRESAR DATOS A ACTUALIZAR:',
      inputs: [
        {
          name: 'id',
          id: 'id',
          type: 'text',
          placeholder: 'Ingresar ID de Solicitud'

        },
        
        // multiline input.
        {
          name: 'url',
          id: 'id-url',
          type: 'text',
          placeholder: 'Ingresar URL'
        },{
          name: 'autorizante',
          type: 'text',
          id: 'id-autorizante',
          placeholder: 'Ingresar nombre del Autorizante'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {

            this.solicitudVideoService.getSolicitud(data.id).subscribe(solicitudBD =>{

              if(solicitudBD.ok == true){

                this.solicitudVideoService.ActualizarSolcitud(data).subscribe( respSolicitud =>{
                  
                  this.presentAlert(respSolicitud.message);
      
                });
                
              }else{

               this.presentAlert(solicitudBD.message);
              }

            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btnAlertCancelar',
  
        }
      ]
    });

    await alert.present();
  }


async EliminarSolicitud(){
  
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Ingresar ID de la Solicitud a Eliminar: ',
      inputs: [
          {
            name: 'id',
            type: 'text',
            id: 'id',
            placeholder: 'Ingresar ID de la SOLICITUD'
          }],
      buttons: [{
            text: 'Ok',
            handler: (data: any) =>{

              this.solicitudVideoService.getSolicitud(data.id).subscribe( res =>{
                
                if(res){
                  this.AlertConfirmarBorrado(data.id);                
                }else{
                  this.presentAlert(res.message);
                }



              });

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




  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'SE INFORMA QUE: ',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


  async AlertConfirmarBorrado(id: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '¡ATENCIÓN!',
      message: '¿Estás seguro que desea borrar esa Solicitud?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.solicitudVideoService.Eliminarsolicitud(id).subscribe(resp =>{
            
                
                this.presentAlert(resp.message);
              

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




  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'ESTAMOS GENERANDO SU SOLICITUD...',
      showBackdrop: true
    });
    await this.loading.present();
  }

}
