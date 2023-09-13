import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../Interface/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 url: string = environment.url;
 controller:string= 'Prueba/';
  constructor(private http: HttpClient
    ) { }

    getCargos(): Observable<any>{
    
      return this.http.get<any>(this.url+this.controller+'GetAllCargos');
    }
    getDepartamentos(): Observable<any>{
    
      return this.http.get<any>(this.url+this.controller+'GetAllDepartamentos');
    }
    GetAllUsuarios(): Observable<any>{
    
      return this.http.get<any>(this.url+this.controller+'GetAllUsuarios');
    }
    SetUsuarios(usuario : IUsuario): Observable<any>{
    
      return this.http.post<any>(this.url+this.controller+'SetUsuario',usuario);
    }
    DeleteUsuarios(usuario : IUsuario): Observable<any>{
    
      return this.http.post<any>(this.url+this.controller+'DeleteUsuario',usuario);
    }
    UpdateUsuarios(usuario : IUsuario): Observable<any>{
    
      return this.http.post<any>(this.url+this.controller+'UpdateUsuario',usuario);
    }
    
    GetUsuariosFiltros(usuario : IUsuario): Observable<any>{
      let header = new HttpHeaders()
    .set('Type-content','aplication/json')
      return this.http.post<any>(this.url+this.controller+'GetUsuariosFiltros',usuario);
    }
  
}
