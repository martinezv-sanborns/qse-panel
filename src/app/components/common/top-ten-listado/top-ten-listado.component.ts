import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TicketResponse } from 'src/app/models/response/ticket.model';

@Component({
  selector: 'app-top-ten-listado',
  templateUrl: './top-ten-listado.component.html',
  styleUrls: ['./top-ten-listado.component.scss'],
})
export class TopTenListadoComponent implements OnInit, OnChanges {
  @Input() entradaListadoTickets: TicketResponse[]=[];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit() {}

}
