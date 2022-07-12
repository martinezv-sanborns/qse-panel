import { Component, Input, OnInit } from '@angular/core';

// models
import { TicketTipoResponse } from 'src/app/models/response/ticket.model';

@Component({
  selector: 'app-tipos-ticket',
  templateUrl: './tipos-ticket.component.html',
  styleUrls: ['./tipos-ticket.component.scss'],
})
export class TiposTicketComponent implements OnInit {

  @Input() ticketTipos: TicketTipoResponse[];

  constructor() { }

  ngOnInit() {
  }

}
