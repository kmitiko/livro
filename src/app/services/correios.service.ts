import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endereco } from '../models/endereco.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(private http: HttpClient) { }

  getEndereco(cep:string): Observable<Endereco> {
    return this.http.get<Endereco>(`${environment.correiosWS}/${cep}/json/`);
  }
}
