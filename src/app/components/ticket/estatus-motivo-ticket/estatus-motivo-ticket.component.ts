import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estatus-motivo-ticket',
  templateUrl: './estatus-motivo-ticket.component.html',
  styleUrls: ['./estatus-motivo-ticket.component.scss'],
})
export class EstatusMotivoTicketComponent implements OnInit {
  @Input() title: string;
  @Input() mensajeMotivo: string;

  
  estatusForm: FormGroup;
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrarModal(){
    this.modalCtrl.dismiss({
      close: true
    });
  }


  enviarMotivoEstatus(){}
}
