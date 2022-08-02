import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CadenasAPIResponse, CadenaUsuarioResponse } from 'src/app/models/response/cadena.model';
import { CadenaService } from 'src/app/services/cadena.service';
import { HelperService } from 'src/app/services/helper.service';
import { Cadena } from '../../../models/response/cadena.model';

@Component({
  selector: 'app-cadena-selector',
  templateUrl: './cadena-selector.component.html',
  styleUrls: ['./cadena-selector.component.scss'],
})
export class CadenaSelectorComponent implements OnInit {

  @Input() usuarioId;

  lasCadenas: CadenaUsuarioResponse[] = [];
  canalIdSeleccionado: string;
  canalName: string;

  constructor(private cadenasAPI: CadenaService, private modalCtrl: ModalController,  private helperService: HelperService,) { }

  ngOnInit() {
    this.obtenerCanales();
  }

  obtenerCanales() {
    this.cadenasAPI.obtenerCanales(this.usuarioId).subscribe((exito: CadenasAPIResponse) => {

         this.lasCadenas = exito.dtoResult;

         if(this.lasCadenas?.length==1){

          console.log(this.lasCadenas)
          this.canalIdSeleccionado=this.lasCadenas[0].cadena.cadenaId;
          this.canalName= this.lasCadenas[0].cadena.nombre;

          console.log("cadena id", this.canalIdSeleccionado);
          console.log("nombre canal",this.canalName);
          console.log("objetoooo",this.lasCadenas)
          this.helperService.showLoading("Cargando","circles");
          this.EnviaCanal(this.canalIdSeleccionado,this.canalName);

        //  localStorage.setItem('cadenaSelectedId',this.canalIdSeleccionado);
         // localStorage.setItem('cadenaName', data.name);

          

         }
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  onSelectedCanal(portalSelected: string, name: string) {
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


  EnviaCanal(id,nombre) {



    setTimeout(() => {
      this.helperService.hideLoading();
      
      this.modalCtrl.dismiss({
        close: true,
        portalSelected: true,
        portalId: id,
        name: nombre
      });
    }, 1000 );

  
  }


  cerrarModal() {
    this.modalCtrl.dismiss({
      close: true,
      portalSelected: false
    });
  }

}
