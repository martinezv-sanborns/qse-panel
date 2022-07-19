import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estatus-color',
  templateUrl: './estatus-color.component.html',
  styleUrls: ['./estatus-color.component.scss'],
})
export class EstatusColorComponent implements OnInit {

  @Input() status: string;
  colorSeleccionado: string;

  colorsStatus = [{
    color: 'primary',
    status: 'Iniciado'
  },
  {
    color: 'secondary',
    status: 'Atendiendo'
  },
  {
    color: 'warning',
    status: 'Reabierto'
  },
  {
    color: 'danger',
    status: 'Cerrado Corporativo'
  },
  {
    color: 'success',
    status: 'Cerrado en Tienda'
  }
  ];

  constructor() {
    this.colorSeleccionado = '';
  }

  ngOnInit() {
    this.colorSeleccionado = this.colorsStatus.filter(c => c.status === this.status)[0].color;
  }

}
