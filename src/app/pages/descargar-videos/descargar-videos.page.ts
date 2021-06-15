import { Component, OnInit} from '@angular/core';
import { Solicitud } from '../../interfaces/interfacesSolicitud';
import { SolicitudVideosService } from '../../services/solicitud-videos.service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from '../../interfaces/interfaces';
import { DescargarVideoService } from '../../services/descargarVideo.service';
import { CapturarUserService } from '../../services/capturarUser.service';


@Component({
  selector: 'app-descargar-videos',
  templateUrl: './descargar-videos.page.html',
  styleUrls: ['./descargar-videos.page.scss'],
})
export class DescargarVideosPage implements OnInit {

  loading: HTMLIonLoadingElement;
  solicitudes : Solicitud[] =[];
  usuarios : Usuarios[] = [];
    

  constructor( private solicitudVideos: SolicitudVideosService,
                private alertController: AlertController,
                private usuarioService: UsuariosService,
                private descargarVideoService : DescargarVideoService,
                public loadingController: LoadingController,
                private userclickservice: CapturarUserService) { }

    ngOnInit() {
      
        //capturamos los datos del usuario que fue clickeado para ver las solicitudes
      //  this.id = this.userclickservice.MostrarUserSeleccionado();

      /**
       * NECESITO EL LEGAJO DEL USUARIO AL CUAL SE DIÓ CLICK PARA VER LAS SOLICITUDES
       * POR EL MOMENTO SE ESTÁ VIENDO EN PANTALLA TODAS LAS SOLICITUDES.
      */
      this.solicitudVideos.getSolicitudesDeUsuario().subscribe( SolicitudBD =>{

          this.solicitudes.push(...SolicitudBD.result);
      
      },
      (error) => console.log(error));
      
    }


    DescargarVideo(index: number){
 
         
      this.presentLoading();
          
          this.descargarVideoService.descargarVideo(this.solicitudes[index]).subscribe(videoDescargado => {
            
            if(videoDescargado.Ok == false){

              this.presentAlert(videoDescargado.Message);

            }else{            
  
              if(videoDescargado.Ok == true){
                             
                this.solicitudVideos.ActualizarStatusAndPathVideo(this.solicitudes[index], videoDescargado).subscribe(resStatus =>{
               
                  //Usamos esa función para cerrar el mesagen que muestra por pantalla de que
              //se encuentra descargando el video
              setTimeout(()=>{
                
                this.loading.dismiss();
  
              }, 1000); 

                  this.presentAlert(resStatus.message);
  
                }, (err)=> console.log(err));
  
              }else{
                this.presentAlert(videoDescargado.Message)
              }
              
            }
          }, 
        
      (err) => {
        console.log(err)
      });

    }
    
    async presentAlert(message: string) {
      const alert = await this.alertController.create({
        backdropDismiss: false,
        header: 'SE INFORMA QUE: ',
        message,
        buttons: [{
          text: 'OK',
          handler: () => {
            this.solicitudes =[];
            this.usuarios = [];
            this.ngOnInit();
          }
        }]
      });
      await alert.present();
      }

    async presentLoading() {
            this.loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'ESTAMOS DESCARGANDO SU VIDEO...',
              showBackdrop: true
            });
            await this.loading.present();
          }




}
