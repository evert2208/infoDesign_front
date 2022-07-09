import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Grupo } from './models/grupo.model';
import { GruposService } from './services/grupos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front_info';
  public cargando: boolean= true;
  public grupos: any | Grupo[]= [];

  //public formulario: FormGroup|any;

  public formSubmmited = false;


    public formulario: FormGroup|any = this.fb.group({
    nombre: ['', Validators.required],
    valorMax: ['', Validators.required],
    valorAct: ['', Validators.required],
    fecha: ['', Validators.required],

  });


  constructor(private gruposService: GruposService,
              private fb: FormBuilder){}
  ngOnInit(): void {
    this.cargarGrupos();
  }
  eliminarGrupo(grupo: Grupo){
    this.gruposService.borrarGrupo(grupo._id)
    .subscribe(resp => {
      this.cargarGrupos();
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
      console.log(this.formulario.value);
      Swal.fire('creado', `se creo el grupo ${this.grupos.nombre}`, 'success');
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
      Swal.fire('Actualizado', grupo.nombre, 'success')
    })
  }

  // async abrirSweetAlert(){
  // const { value: formValues } = await Swal.fire({
  //   title: 'Crear Grupo',
  //   html:
  //     '<h6>Nombre:<h6/>'+
  //     '<input id="nombre" class="swal2-input">' +
  //     '<h6>Valor Maximo:<h6/>'+
  //     '<input id="valor_max" class="swal2-input">',
  //   focusConfirm: false,
  //   preConfirm: () => {
  //     return [
  //       document.getElementById('nombre').value,
  //       document.getElementById('valor_max').value
  //       ]
  //     }
  //   })


  //   if (formValues) {
  //   Swal.fire(JSON.stringify(formValues))
  //   }
  // }
}
