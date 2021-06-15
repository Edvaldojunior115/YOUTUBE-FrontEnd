import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlinesVideo } from '../interfaces/interfaceVerVideo';



@Injectable({
  providedIn: 'root'
})

export class VideoService {

     public url = 'http://localhost:3000/';
    

    constructor(private http: HttpClient) {
        
    }

    getPathvideoUser( idUser: string ){
        
            return this.http.get<RespuestaTopHeadlinesVideo>(this.url+'misVideos?id=' +idUser);

    }

    VerVideo(pathVideo: string){
      
        return this.http.get(this.url +'verVideos?url='+pathVideo);
        
    }





} 

