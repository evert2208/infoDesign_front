import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Grupo } from './models/grupo.model';
import { GruposService } from './services/grupos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front_info';
  public cargando: boolean= true;
  public grupos: any | Grupo[]= [];
  alerta: number = 0;
  cargaalerta= false;


  public formSubmmited = false;


    public formulario: FormGroup|any = this.fb.group({
    nombre: ['', Validators.required],
    valorMax: ['', Validators.required],
    valorAct: ['0', Validators.required],
    fecha: ['', Validators.required],
    alertas: [this.alerta]

  });

  resultados: any[]=[];
  constructor(private gruposService: GruposService,
              private fb: FormBuilder){}
  ngOnInit(): void {
    this.cargarGrupos();
    this.cargarGrafica();

  }

  cargarGrafica(){
    this.gruposService.cargarGrupos().pipe(
      map((resp: Grupo[])=>{
        return resp.map(res=>{
          return {
            name:res.nombre,
            value:res.alertas
          }
        })
      })
    ).subscribe(
      results => {

        this.resultados=results;
      }
    )
  }
  eliminarGrupo(grupo: Grupo){
    this.gruposService.borrarGrupo(grupo._id)
    .subscribe(resp => {
      this.cargarGrupos();
      this.cargarGrafica();
      Swal.fire('Borrado', grupo.nombre, 'success')
    });
  }

  crearGrupo(){

    this.formSubmmited=true;


    if(this.formulario.invalid) {
     Swal.fire('Error', 'llene los campos', 'error');
    }


    this.gruposService.crearGrupo(this.formulario.value).subscribe(resp=> {
      this.cargarGrupos();
      this.cargarGrafica();



      Swal.fire('creado', `se creo el grupo`, 'success');
    }, (err)=> {
      // si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  cargarGrupos() {
    this.cargando= true;
    this.gruposService.cargarGrupos().subscribe(grupos => {
      this.cargando= false;
      this.grupos=grupos;

    })
  }

  editarGrupo(grupo: Grupo){

    this.gruposService.actualizarGrupo(grupo._id, grupo.nombre, grupo.valorMax)
    .subscribe(resp => {
      this.cargarGrupos();
      this.cargarGrafica();
      Swal.fire('Actualizado', grupo.nombre, 'success')
    })
  }

  random(grupo: Grupo){

    const rand = Math.floor( Math.random() * 100 );
    grupo.valorAct= rand;
    if(rand>grupo.valorMax){
      grupo.alertas=grupo.alertas +1;
      this.gruposService.actualizarValorAct(grupo._id, grupo.valorAct, grupo.alertas).subscribe(resp=>{
        grupo.valorAct= rand;
        this.cargarGrafica();


      } )
    }
  }


}
