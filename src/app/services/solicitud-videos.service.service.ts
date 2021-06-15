import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlinesSolicitud, Solicitud } from '../interfaces/interfacesSolicitud';
import { InterfaceVideo } from '../interfaces/interfaceVideos';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVideosService{

  public url = 'http://localhost:3000/';

  constructor( private http: HttpClient) { }

    
  getSolicitud(id: string){
      
    return this.http.get<RespuestaTopHeadlinesSolicitud>(this.url+'UnaSolicitud?id='+id);
    // return this.http.get<RespuestaTopHeadlinesSolicitud>(this.url+'solicitud?legajo='+legajo);
  
  }
  getTodasSolicitudDeUsuario(legajo: string){

      return this.http.get<RespuestaTopHeadlinesSolicitud>(this.url+'solicitud?legajo='+legajo)
  }
  
  getSolicitudesDeUsuario(){
      
      return this.http.get<RespuestaTopHeadlinesSolicitud>(this.url+'solicitudes');
    
    }
    
             
  CrearSolicutd( solicitud: {}){

    return this.http.post<RespuestaTopHeadlinesSolicitud>(this.url+'solicitud', solicitud);

  }

 
      
  ActualizarSolcitud(solicitud: Solicitud){

    return this.http.put<RespuestaTopHeadlinesSolicitud>(this.url+'solicitud', solicitud);
  }

   

  Eliminarsolicitud(id: string){
    return this.http.delete<RespuestaTopHeadlinesSolicitud>(this.url+'solicitud'+'?id='+id);
  }

  ActualizarStatusAndPathVideo(solicitud: Solicitud, video: InterfaceVideo){

    let params = {
      id: solicitud.id,
      TituloVideo: video.TituloVideo,
      Minutos: video.minutos,
    }; 

    return this.http.put<RespuestaTopHeadlinesSolicitud>(this.url+'StatusVideo', params);
  }

  


}
