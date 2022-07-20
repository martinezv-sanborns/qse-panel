import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { UsuarioRequest } from 'src/app/models/request/usuario.model';
import { RolesApiResponse, RolResponse } from 'src/app/models/response/Rol.model';
import {  UsuarioApiResponse } from 'src/app/models/response/usuario.model';
import { HelperService } from 'src/app/services/helper.service';
import { RolService } from 'src/app/services/rol.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';
import { SwiperComponent } from "swiper/angular";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss'],
})
export class CrearUsuarioComponent implements OnInit {


  

  usuarioForm: FormGroup;
  esActivo: boolean;
  listRoles: RolResponse[] = [];
  rolSeleccionado: RolResponse;
  registrando: boolean;
  config: SwiperOptions = {};

  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private rolService: RolService,
    private helperService: HelperService,
    private usuarioService: UsuarioService,
    private spinnerService: SpinnerService) { }

  ngOnInit() {


    this.config = {
      slidesPerView: 3.5,
      spaceBetween:0,
      loop: true,
      navigation: true,  
      history:{
        key:'slide'
      },
      scrollbar: { draggable: true }
    };
  
    

    this.esActivo = false;
    this.getRoles();
    this.cargarFormulario();


  }


  get nickNameNoValidoNoValido() {
    return this.usuarioForm.get('nickName').invalid && this.usuarioForm.get('nickName').touched;
  }

  get emailNoValido() {
    return this.usuarioForm.get('email').invalid && this.usuarioForm.get('email').touched;
  }


  get nombreNoValido() {
    return this.usuarioForm.get('nombre').invalid && this.usuarioForm.get('nombre').touched;
  }
  
  
  async registrarUsuario() {
    if (this.usuarioForm.invalid) {

      return Object.values(this.usuarioForm.controls).forEach(async (control, index) => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());
        } else {
          control.markAsTouched();
        }

        if (index === 0) {
          
          const alertValidateData = await this.alertCtrl.create({
            cssClass: 'alertWarning',
            message: this.helperService.getMessageAlert('Ingrese los datos marcados con rojo', 'warning'),
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

          const { data } = await alertValidateData.onDidDismiss();
        }

      });

    }

    if (this.rolSeleccionado === undefined) {
      const alertValidateRol = await this.alertCtrl.create({
        cssClass: 'alertWarning',
        message: this.helperService.getMessageAlert('Por favor seleccione un rol', 'warning'),
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
      await alertValidateRol.present();
      return;
    }

    this.registrando = true;

    const nombreUser: string = this.usuarioForm.value.nombre;

    const elUsuarioModel: UsuarioRequest = {
      email: this.usuarioForm.value.email,
      nombre: this.usuarioForm.value.nombre,
      nombreUsuario: this.usuarioForm.value.nickName,
      rolId: this.rolSeleccionado.rolId,
      activo: this.esActivo,
      nombreCorto: nombreUser.substring(0, 4),
      password: '',
      intentos: 0,
      bloqueado: true,
      iconName: ''
    };

    this.spinnerService.setTitulo = 'Registrando...';
    this.usuarioService.registrar(elUsuarioModel).subscribe(async (exito: UsuarioApiResponse) => {
      this.spinnerService.setTitulo = '';
      this.registrando = false;
      if (exito.result === 'OK') {
        // se cierra la modal
        exito.dtoResult.rol = this.rolSeleccionado;
        this.modalCtrl.dismiss({
          nuevo: exito.dtoResult,
          registrado: true
        });

        // show alert success
        const alertSuccess = await this.alertCtrl.create({
          cssClass: 'alertSuccess',
          message: this.helperService.getMessageAlert(`El usuario ${elUsuarioModel.nombre} fue creado correctamente,
          se mando un link a su correo para activarlo y restablecer contraseña.`, 'success'),
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
        await alertSuccess.present();

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

      }
    },
      async (error) => {
        console.log(error);
        this.registrando = false;
        this.spinnerService.setTitulo = '';

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

  cargarFormulario() {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      nickName: ['', Validators.required, Validators.maxLength(8)],
      email: ['', [Validators.minLength(5), Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    });
  }


  getRoles() {
    console.log("entre a get roles")
    this.rolService.obtenerRoles().subscribe((exito: RolesApiResponse) => {

      if (exito.result === 'OK') {
        this.listRoles=null;
       
        this.listRoles = exito.dtoResult;
        console.log(this.listRoles);
      }

    }, (error) => {
      console.log(error);
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss({
      close: true,
      registrado: false
    });
  }

    onChangeStatus() {
    this.esActivo = !this.esActivo;
  }

  onRolSelected(elRol: RolResponse) {
    // update rol selected
    this.rolSeleccionado = elRol;

    // clean seleccionado
    const rolIndexSelected = this.listRoles.findIndex(r => r.isSelected === true);
    if (rolIndexSelected > -1) {
      this.listRoles[rolIndexSelected].isSelected = false;
    }

    // marcar el nuevo
    const rolIndex = this.listRoles.findIndex(r => r.rolId === elRol.rolId);
    this.listRoles[rolIndex].isSelected = true;
  }


}
