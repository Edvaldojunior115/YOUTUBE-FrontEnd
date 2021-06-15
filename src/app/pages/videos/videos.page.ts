import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/videos.service';
import { CapturarUserService } from '../../services/capturarUser.service';
import { Video, RespuestaTopHeadlinesVideo } from '../../interfaces/interfaceVerVideo';
import { Usuarios } from '../../interfaces/interfaces';




@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {

  Usuarioclickado: Usuarios[] = [];

  videopath: Video[] = [];
   

  constructor( private video: VideoService, private userCapturado: CapturarUserService) { }

  ngOnInit() {

    
  }


 getPathVideo(){
    
    const id = this.userCapturado.getIdUsuarioSeleccionado();
    
    // console.log('USUARIO QUE SE VERÁ EL VIDEO ES: ', id);

    this.video.getPathvideoUser(id).subscribe( videoBD =>{

      if(videoBD.ok == false){

        console.log(videoBD.message);
      }

      this.videopath.push(...videoBD.result);

    },
    (err: RespuestaTopHeadlinesVideo) => console.log(err.message));

  }

    // async UsuarioSeleccionado(){
    
  //   let idUsuario = await this.userCapturado.MostrarUserSeleccionado();
   
  //   console.log('SEU ID É: ', idUsuario);
  //   return idUsuario; 

  //   }


  // getVideosUser(url: string){

  //   this.video.VerVideo(url).subscribe( VideoBD => {
      
  //     if(!VideoBD){

  //       console.log(VideoBD);
        
  //     }else{

  //    console.log(VideoBD);
          
  //     }

  //   }, (err)=> console.log(err));
  // }
  
 

  

}
