import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { LoginService } from '../../services/login.service';
import { AlertController, NavController } from '@ionic/angular';
import { CapturarUserService } from '../../services/capturarUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 
constructor( private alertController:AlertController,
             private usuario: UsuariosService,
             private login: LoginService,
             private navCtrl: NavController,
             private capturaUser: CapturarUserService) { }

user = {

  legajo: '',
  password: ''

}

 data = {
  passwordBD: '',
  passwordUser: ''

 }

  ngOnInit() {

  }


  RealizarLogin(){

      this.usuario.getUsuarioBD(this.user.legajo).subscribe( userBD =>{

        if(userBD.ok == false){

          console.log(userBD.message);
          
        }else{
         
          this.data.passwordBD = userBD.result[0].password;
          this.data.passwordUser = this.user.password;

          this.login.login(this.data).subscribe( resultadoLogin => {

          if(resultadoLogin.ok == false){

           this.presentAlert(resultadoLogin.message);

          }else{

            if(userBD.result[0].role == 'ROLE_USER'){
              
                this.navCtrl.navigateRoot('/videos', {animated: true});
                this.presentAlert(resultadoLogin.message);
                this.capturaUser.getDatosUserCapturado(userBD.result[0]);

            }else{
              this.navCtrl.navigateRoot( '/main/tabs/tab1', {animated: true});
            }

          }
        }, (err) =>{

            console.log(err);
        });

        }
        
      }, (err) => console.log('ERROR: ', err));

  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message: message,
      buttons: ['OK']
    });
    await alert.present();

  }

}
