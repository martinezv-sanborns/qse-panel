import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { DiaSemana } from 'src/app/models/helper.model';
import { HelperService } from 'src/app/services/helper.service';
import { format, parseISO } from 'date-fns';
import { CatalogoService } from '../../../services/catalogo.service';
import { ZonaHorariaApiResponse, ZonaHorariaResponse } from 'src/app/models/response/zonahoraria.model';
import { TiendaRequest } from 'src/app/models/request/tienda.model';
import { TiendaService } from 'src/app/services/tienda.service';
import { TiendaApiResponse, TiendaResponse } from 'src/app/models/response/tiendaresponse.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tienda',
  templateUrl: './crear-tienda.component.html',
  styleUrls: ['./crear-tienda.component.scss'],
})
export class CrearTiendaComponent implements OnInit {
  tiendaForm: FormGroup;
  listaDiasSemana: DiaSemana[] = this.helperService.arrayDiasSemana;

  checkedItems = [];
  masterCheck:boolean;
  isIndeterminate:boolean;
  
  hourLandingaper = '';
  hourLandingcierre = '';
  listadoZonasHorarias: ZonaHorariaResponse[] = [];

  laTienda: TiendaResponse;
  diasseleccionados: string = '';

  constructor(private fb: FormBuilder, public modalCrtl: ModalController, private helperService: HelperService,
    private catalogoService: CatalogoService, private tiendaService: TiendaService, private alertCtrl: AlertController) { }

  ngOnInit() {


    console.log('Dias Semana', this.listaDiasSemana);
    this.CargarFormulario();
    this.getZonaHoraria();
  }

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true
    });
  }

  crearTienda(){
    // return Object.values(this.tiendaForm.controls).forEach(async (control, index) => {
    //   if (control instanceof FormGroup) {
    //     Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());
    //     console.log('Entra');
    //   } else {
    //     control.markAsTouched();
    //     console.log('No entra');
    //   }

    //   console.log('Numero de campos', index);
    //   if (index === 0) {
        
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Faltan Datos',
    //       text: 'Ingrese los datos faltantes',
    //       heightAuto: false
    //     });
    //   }
    // });

    Swal.fire({
      icon: 'question',
      title: 'Crear Tienda',
      text: `¿Estas seguro que desea crear la Tienda: ${this.tiendaForm.value.nombre.toString()}?`,
      showCancelButton: true,
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {

      this.checkedItems.forEach(obj => {
        this.diasseleccionados += obj.name.toLowerCase( ) + "|";
      });

      console.log('Dias seleccionado', this.diasseleccionados);

      const elTiendaModel: TiendaRequest = {
        email: this.tiendaForm.value.email,
        nombre: this.tiendaForm.value.nombre,
        nombreCorto: this.tiendaForm.value.nombrecorto,
        identificadorExterno: this.tiendaForm.value.identificador,
        coordenadas: this.tiendaForm.value.coordenadas,
        apertura: this.hourLandingaper.toString(),
        cierre: this.hourLandingcierre.toString(),
        umt: '5',
        diasOperacion: this.diasseleccionados,
        cadenaId: localStorage.getItem('cadenaSelectedId'),
        zonaHorariaId: this.tiendaForm.value.zona,
      };

      console.log('La tienda creada', elTiendaModel);

      //this.spinnerService.setTitulo = 'Registrando...';
      this.tiendaService.crearTienda(elTiendaModel).subscribe(async (exito: TiendaApiResponse) => {
        //this.spinnerService.setTitulo = '';
        //this.registrando = false;
        if (exito.result === 'OK') {
          this.laTienda = exito.dtoResult; 
          Swal.fire({
            icon: 'success',
            title: 'Tienda Creada',
            text: `La tienda ${this.tiendaForm.value.nombre} se creo correctamente`,
            heightAuto: false
          });
          this.LimpiarCheck();
          this.checkedItems = [];
      } else {
        const alertValidateData = await this.alertCtrl.create({
          cssClass: 'alertWarning',
          message: this.helperService.getMessageAlert(exito.error, 'warning'),
          animated: true,
          buttons: [
            {
              text: 'Aceptar',
              cssClass: 'alertButton',
              id: 'confirm-button',
              handler: () => {
              }
            }]
        });
        await alertValidateData.present();
        this.checkedItems = [];
      }
    },
      async (error) => {
        console.log(error);
        //this.registrando = false;
        //this.spinnerService.setTitulo = '';
        this.checkedItems = [];
        this.LimpiarCheck();
        if (error.error.result === 'NO-SEND') {

          const alertValidateData = await this.alertCtrl.create({
            cssClass: 'alertSuccess',
            message: this.helperService.getMessageAlert(error.error.error, 'success'),
            animated: true,
            buttons: [
              {
                text: 'Aceptar',
                cssClass: 'alertButton',
                id: 'confirm-button',
                handler: () => {
                }
              }]
          });
          await alertValidateData.present();
        } else {
          const alertValidateData = await this.alertCtrl.create({
            cssClass: 'alertWarning',
            message: this.helperService.getMessageAlert(error.error.error, 'warning'),
            animated: true,
            buttons: [
              {
                text: 'Aceptar',
                cssClass: 'alertButton',
                id: 'confirm-button',
                handler: () => {
                }
              }]
          });
          await alertValidateData.present();
        }

      });
      
    }
  });
  }

  CargarFormulario(){
    this.tiendaForm = this.fb.group({
      nombre:[''],
      identificador:[''],
      nombrecorto:[''],
      email:[''],
      coordenadas:[''],
      apertura:[''],
      cierre:[''],
      zona:[''],
      checkedItems : ['']
    })
    this.hourLandingaper='';
    this.hourLandingcierre ='';

    this.checkedItems = [];
  }

  formatDate(value: string) {
    //this.modalCrtl.dismiss();
    this.hourLandingaper=format(parseISO(value), 'HH:mm');
    console.log('FECHA', this.hourLandingaper);
    return format(parseISO(value), 'HH:mm');
  }

  formatDate1(value: string) {
    //this.modalCrtl.dismiss();
    this.hourLandingcierre=format(parseISO(value), 'HH:mm');
    console.log('FECHA', this.hourLandingcierre);
    return format(parseISO(value), 'HH:mm');
  }
  
  onChange(item) {
    console.log('Item checado', item);
    if(this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value)=>value!=item);
    } else {
      this.checkedItems.push(item)
    }
    console.log('Lista', this.checkedItems)
  }

  checkMaster(eve) {
    setTimeout(()=>{
      this.checkedItems.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }
LimpiarCheck(){
  this.checkedItems.forEach(obj => {
    obj.isChecked = false;
  });
}

  getZonaHoraria(){
    this.catalogoService.obtenerZonaHoraria(1, 100)
    .subscribe((exito: ZonaHorariaApiResponse) => {

      if (exito.result === 'OK') {
        console.log('Tiendas Filtro', exito.dtoResult);
        this.listadoZonasHorarias = exito.dtoResult;
      }
    },
      (err) => {
        console.log(err);
      });
  }
}
