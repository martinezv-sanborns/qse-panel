import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// controllers
import { AlertController, ModalController } from '@ionic/angular';
import { OlvidePasswordRequest } from 'src/app/models/request/usuario.model';
import { UsuarioLinkApiResponse } from 'src/app/models/response/usuario.model';

// models
//import { OlvidePasswordRequest } from 'src/app/models/request/usuario.request.model';
//import { UsuarioLinkApiResponse } from 'src/app/models/response/usuario.model';

// services
import { HelperService } from 'src/app/services/helper.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';
//import { UsuarioService } from '../../../services/usuario.service';
//import { SpinnerService } from '../../../services/spinner.service';


@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.component.html',
  styleUrls: ['./olvide-password.component.scss'],
})
export class OlvidePasswordComponent implements OnInit {
  olvidePasswordForm: FormGroup;

  constructor(private formB: FormBuilder,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private helperService: HelperService,
    private userService: UsuarioService,
    private spinnerService: SpinnerService
   )

    { }

  get emailValido() {
    return this.olvidePasswordForm.get('email').invalid && this.olvidePasswordForm.get('email').touched;
  }

  ngOnInit() {
    const patternMail = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

    this.olvidePasswordForm = this.formB.group({
      email: ['', [Validators.required, Validators.pattern(patternMail), Validators.minLength(5), Validators.maxLength(250)]]
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss({
      close: true
    });
  }

  onSendCorreoUser() {

    if (this.olvidePasswordForm.invalid) {

      return Object.values(this.olvidePasswordForm.controls).forEach(async (control, index) => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());
        } else {
          control.markAsTouched();
        }

        const alertValidateData = await this.alertCtrl.create({
          cssClass: 'alertWarning',
          message: this.helperService.getMessageAlert(`Ingrese un correo electrónico valido`, 'warning'),
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


      });
    }

    const elCorreo: string = this.olvidePasswordForm.value.email;

    const correoUser: OlvidePasswordRequest = {
      correo: elCorreo.trim()
    };

    this.spinnerService.setTitulo = 'Enviando correo, espere un momento por favor...';
    this.userService.sendCorreoOlvidePass(correoUser).subscribe(async (exito: UsuarioLinkApiResponse) => {

      this.spinnerService.setTitulo = '';
      if (exito.result === 'OK') {
        // show alert success
        const alertSuccess = await this.alertCtrl.create({
          cssClass: 'alertSuccess',
          message: this.helperService.getMessageAlert(`${exito.dtoResult.message}`, 'success'),
          animated: true,
          buttons: [
            {
              text: 'Aceptar',
              cssClass: 'alertButton',
              id: 'confirm-button',
              handler: () => {
                this.cerrarModal();
              }
            }]
        });
        await alertSuccess.present();
      }
      else {
        this.spinnerService.setTitulo = '';
        const alertValidateData = await this.alertCtrl.create({
          cssClass: 'alertWarning',
          message: this.helperService.getMessageAlert(`${exito.error}`, 'warning'),
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
    }, async (err) => {
      this.spinnerService.setTitulo = '';
      console.log(err);
      this.spinnerService.setTitulo = '';
      const alertValidateData = await this.alertCtrl.create({
        cssClass: 'alertDanger',
        message: this.helperService.getMessageAlert(`Ocurrió un error por favor comuníquese con el administrador.`, 'danger'),
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
    });

    
  }
}