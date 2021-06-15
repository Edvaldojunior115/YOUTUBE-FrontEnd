import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterfaceVideo } from '../interfaces/interfaceVideos';
import { Solicitud } from '../interfaces/interfacesSolicitud';

@Injectable({
    providedIn: 'root'
  })


  export class DescargarVideoService {

    public url = 'http://localhost:3000/';

  constructor( private http: HttpClient) { }
    

  
  descargarVideo(solicitud: Solicitud){
         
    return this.http.post<InterfaceVideo>(this.url + 'descargarvideo', solicitud);

  }

}

  