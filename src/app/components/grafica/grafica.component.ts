import { Component, Input, OnInit } from '@angular/core';

import { GruposService } from '../../services/grupos.service';
//import { single } from './data';
import { Grupo } from '../../models/grupo.model';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  @Input() results: any[]=[];

  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'grupos';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'alarmas';

  colorScheme: string|any = {
    domain: ['#5AA454']
  };

  constructor(private gruposService: GruposService) {
   // Object.assign(this, { single });
  }


  ngOnInit(): void {
    //this.single = this.gruposService.cargarGrupos();
  }


  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
