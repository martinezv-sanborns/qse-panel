import { Component, Input, OnInit } from '@angular/core';
import { TicketLogResponse } from 'src/app/models/response/ticket.model';

@Component({
  selector: 'app-seguimiento-ticket',
  templateUrl: './seguimiento-ticket.component.html',
  styleUrls: ['./seguimiento-ticket.component.scss'],
})
export class SeguimientoTicketComponent implements OnInit {

  @Input() losTicketLogs: TicketLogResponse[];

  constructor() { }

  ngOnInit() {
    this.losTicketLogs = this.losTicketLogs.sort((a,b) => (a.fechaAlta > b.fechaAlta) ? 1 : -1);
  }

}
