import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    //console.log('Dias Semana', this.listaDiasSemana);
    this.CargarFormulario();
    this.getZonaHoraria();
  }

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true
    });
  }

  get nombreKNoValido() {
    return this.tiendaForm.get('nombre').invalid && this.tiendaForm.get('nombre').touched;
  }

  get identificadorNoValido() {
    return this.tiendaForm.get('identificador').invalid && this.tiendaForm.get('identificador').touched;
  }

  get emailNoValido() {
    return this.tiendaForm.get('email').invalid && this.tiendaForm.get('email').touched;
  }

  // get hourLanaperNoValido() {
  //   return this.tiendaForm.get('hourLandingaper').invalid && this.tiendaForm.get('hourLandingaper').touched;
  // }

  // get hourLancieNoValido() {
  //   return this.tiendaForm.get('hourLandingcierre').invalid && this.tiendaForm.get('hourLandingcierre').touched;
  // }

  
  get zonaNoValido() {
    return this.tiendaForm.get('zona').invalid && this.tiendaForm.get('zona').touched;
  }

  crearTienda(){

    const elTiendaModel: TiendaRequest = {
      email: this.tiendaForm.value.email,
      nombre: this.tiendaForm.value.nombre,
      nombreCorto: this.tiendaForm.value.nombrecorto === null ? '' : this.tiendaForm.value.nombrecorto,
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

    if(this.tiendaForm.invalid){

      return Object.values(this.tiendaForm.controls).forEach(control =>{
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());

          console.log('IF del Invalid');
        }
        else{
          control.markAsTouched();

          console.log('ELSE del Invalid');
        }
      });

    }

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
      nombre:['', [Validators.required, Validators.minLength(4)]],
      identificador:['', [Validators.required, Validators.minLength(4)]],
      nombrecorto:[''],
      email:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      coordenadas:[''],
      // apertura:['', [Validators.required]],
      // cierre:['', [Validators.required]],
      apertura:[''],
      cierre:[''],
      zona:['', [Validators.required]],
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
    this.checkedItems =[];
      // if(item === undefined){
      //   console.log('IF', this.checkedItems);
      //   this.listaDiasSemana.forEach(obj => {
      //     this.checkedItems.push(obj);
      //     //console.log('IF', obj);
      //   });


      //   for (let item = 0; item < this.checkedItems.length; item++) {
      //     this.checkedItems[item].checked = true;
      //     //console.log(this.checkedItems[item].checked = true);
      // }
      // }
      // else{
      if(this.checkedItems.includes(item)) {
        this.checkedItems = this.checkedItems.filter((value)=>value!=item);
      } else {
        this.checkedItems.push(item)
      }
    // }
  }


  onChangeT(){
    console.log('Entrando a onChange');
    console.log('IF', this.checkedItems);
    this.listaDiasSemana.forEach(obj => {
      this.checkedItems.push(obj);
      //console.log('IF', obj);
    });

    for (let item = 0; item < this.checkedItems.length; item++) {
      this.checkedItems[item].checked = true;
      //console.log(this.checkedItems[item].checked = true);
  }
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
