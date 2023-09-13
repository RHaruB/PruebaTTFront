import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  
}
