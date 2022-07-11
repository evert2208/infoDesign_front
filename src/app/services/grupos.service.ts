import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo.model';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http: HttpClient) { }

  cargarGrupos(): Observable<Grupo[]> {
    const url = `${base_url}/grupos`;
    return this.http.get<{ok: boolean, grupos: Grupo[]}>(url)
    .pipe(
      map( (resp: {ok: boolean, grupos: Grupo[]}) => resp.grupos)
    )
  }

  crearGrupo(grupo: Grupo){
    const url = `${base_url}/grupos`;
    return this.http.post(url, grupo);

  }
  actualizarValorAct(_id:string, ValorAct: number, alertas: number){
    const url = `${base_url}/grupos/${_id}`;
    return this.http.put(url, {ValorAct, alertas});
  }

  actualizarGrupo(_id: string, nombre: string, valorMax: number ){
    const url = `${base_url}/grupos/${_id}`;
    return this.http.put(url, {nombre, valorMax});

  }

  borrarGrupo(_id: string|any ){
    const url = `${base_url}/grupos/${_id}`;
    return this.http.delete(url);

  }


}
