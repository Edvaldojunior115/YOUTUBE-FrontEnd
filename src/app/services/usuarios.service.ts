import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios, RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  
  public url = 'http://localhost:3000/';

  constructor( private http: HttpClient) { }
   


      getUsuarioBD(legajo: string){
        return this.http.get<RespuestaTopHeadlines>(this.url+'usuario?legajo='+legajo);
    }
    
    getUsuarioPorID(id: number){
      return this.http.get<RespuestaTopHeadlines>(this.url+'UsuarioPorID?id='+id);
    }

    getUsuariosBD(){
       return this.http.get<RespuestaTopHeadlines>(this.url+'usuarios');
    }

       
    RegistrarUsuario( usuario: Usuarios ){

          return this.http.post<RespuestaTopHeadlines>(this.url+'usuario', usuario);
    }

 
      
    ActualizarUsuario(usuario: Usuarios){
    
      return this.http.put<RespuestaTopHeadlines>(this.url+'usuario', usuario);

    }


    EliminarUsuario(legajo: string){
      
      const legajoINT = parseInt(legajo); 
     
      return this.http.delete<RespuestaTopHeadlines>(this.url+'usuario?legajo='+legajoINT);

    }
  
}
