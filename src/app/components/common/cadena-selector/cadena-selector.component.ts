import { Component, Input, OnInit } from '@angular/core';
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

  @Input() usuarioId;

  lasCadenas: Cadena[] = [];
  canalIdSeleccionado: number;
  canalName: string;

  constructor(private cadenasAPI: CadenaService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.obtenerCanales();
  }

  obtenerCanales() {
    console.log("obteniendo canales")
    this.cadenasAPI.obtenerCanales(this.usuarioId).subscribe((exito: CadenasAPIResponse) => {
        console.log("entreeee y tengo algo",exito)
         this.lasCadenas = exito.dtoResult;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  onSelectedCanal(portalSelected: number, name: string) {
    this.canalIdSeleccionado = portalSelected;
    this.canalName = name;
    this.saveCanal();
  }

  saveCanal() {
    this.modalCtrl.dismiss({
      close: true,
      portalSelected: true,
      portalId: this.canalIdSeleccionado,
      name: this.canalName
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss({
      close: true,
      portalSelected: false
    });
  }

}
