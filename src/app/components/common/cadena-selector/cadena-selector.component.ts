import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CadenasAPIResponse } from 'src/app/models/response/cadena.model';
import { CadenaService } from 'src/app/services/cadena.service';
import { Cadena } from '../../../models/response/cadena.model';

@Component({
  selector: 'app-cadena-selector',
  templateUrl: './cadena-selector.component.html',
  styleUrls: ['./cadena-selector.component.scss'],
})
export class CadenaSelectorComponent implements OnInit {

  losPortales: Cadena[] = [];
  portalIdSeleccionado: number;
  portalName: string;

  constructor(private portalesAPI: CadenaService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.obtenerPortales();
  }

  obtenerPortales() {
    this.portalesAPI.obtenerPortales().subscribe(
      (exito: CadenasAPIResponse) => {
        this.losPortales = exito.dtoResult;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  onSelectedPortal(portalSelected: number, name: string) {
    this.portalIdSeleccionado = portalSelected;
    this.portalName = name;
    this.savePortal();
  }

  savePortal() {
    this.modalCtrl.dismiss({
      close: true,
      portalSelected: true,
      portalId: this.portalIdSeleccionado,
      name: this.portalName
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss({
      close: true,
      portalSelected: false
    });
  }

}
