import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TiendaResponse } from 'src/app/models/response/tiendaresponse.model';

@Component({
  selector: 'app-detalle-tienda',
  templateUrl: './detalle-tienda.component.html',
  styleUrls: ['./detalle-tienda.component.scss'],
})
export class DetalleTiendaComponent implements OnInit {
  @Input() laTienda: TiendaResponse;



  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true
    });
  }


}
