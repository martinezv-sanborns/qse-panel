import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-hay-resultados',
  templateUrl: './no-hay-resultados.component.html',
  styleUrls: ['./no-hay-resultados.component.scss'],
})
export class NoHayResultadosComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {}

}
