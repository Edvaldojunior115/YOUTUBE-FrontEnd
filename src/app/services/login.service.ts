import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { MessageLogin, Login } from '../interfaces/interfacesLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url = 'http://localhost:3000/';

  constructor( private http: HttpClient) { }

  

  login(data: Login){
    
      return this.http.post<MessageLogin>(this.url+'login', data);

  }





}
