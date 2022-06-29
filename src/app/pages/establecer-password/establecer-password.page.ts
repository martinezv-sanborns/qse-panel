import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { NuevaPassWordUser } from 'src/app/models/request/usuario.model';
import { UsuarioApiResponse } from 'src/app/models/response/usuario.model';
import { HelperService } from 'src/app/services/helper.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-establecer-password',
  templateUrl: './establecer-password.page.html',
  styleUrls: ['./establecer-password.page.scss'],
})
export class EstablecerPasswordPage implements OnInit {


  @Input() titulo: string;
  @Input() esModal: boolean;
  //@Input() entidadId: string;


  entidadId: string;
  linkExpiro: boolean;
  mensajeErr: string;


  establecerPasswordForm: FormGroup;
  estableciendo = false;

  constructor(private formB: FormBuilder,
    private elrouter: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private helperService: HelperService,
    private userService: UsuarioService,
    private spinnerService: SpinnerService
  ) { }

  get passwordValido() {
    return this.establecerPasswordForm.get('password').invalid && this.establecerPasswordForm.get('password').touched;
  }

  get mismaPasswordValido() {
    return this.establecerPasswordForm.get('mismaPassword').invalid && this.establecerPasswordForm.get('mismaPassword').touched;
  }

  ngOnInit() {



    const idLink = this.route.snapshot.paramMap.get('id');
    this.validateLink(idLink);
    this.entidadId = idLink;


    console.log('entra aqui entidad id',idLink);

   // console.log('entra aqui modal', this.esModal);
    //console.log('entra aqui titulo', this.titulo);

    const patternPassword = '((?=.*[0-9])|(?=.*\W+))(?![.\n])(?=.*[.$@$!%*?&_])(?=.*[A-Z])(?=.*[a-z]).{8,}$';

    this.establecerPasswordForm = this.formB.group({
      password: ['', [Validators.required, Validators.pattern(patternPassword), Validators.minLength(8)]],
      mismaPassword: ['', [Validators.required, Validators.pattern(patternPassword), Validators.minLength(8)]],
    });
  }

  cerrarModal() {
    this.modalCtrl.dismiss({
      close: true
    });
  }

  async establecerPasswordUser() {


    const pass1: string = this.establecerPasswordForm.value.password;
    const pass2: string = this.establecerPasswordForm.value.mismaPassword;

    if (this.establecerPasswordForm.invalid) {

      return Object.values(this.establecerPasswordForm.controls).forEach(async (control, index) => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());
        } else {
          control.markAsTouched();
        }

        if (index === 0) {
          let mensaje = '';
          if (pass1 !== pass2) {
            mensaje = 'Las contraseñas no son iguales.';
          }
          else if (pass1.trim().length < environment.minimumCharactersPassword) {
            mensaje = `Su contraseña debe tener ${environment.minimumCharactersPassword} caracteres como mínimo`;
          }
          else if (this.establecerPasswordForm.controls.password.invalid) {
            mensaje = 'La contraseña no es válida.';
          }
          else if (this.establecerPasswordForm.controls.mismaPassword.invalid) {
            mensaje = 'La confirmación de la contraseña no es válida.';
          }
          else {
            mensaje = `Escriba los campos marcados con rojo`;
          }

          const alertValidateData = await this.alertCtrl.create({
            cssClass: 'alertWarning',
            message: this.helperService.getMessageAlert(`${mensaje}`, 'warning'),
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

    const nuevoPassword: NuevaPassWordUser = {
      nuevaPassword: pass1,
      entidadId: this.entidadId
    };

    if (this.esModal) {
      this.onCambiarPassword(nuevoPassword);
    }
    else {
      this.onEstablecerPassword(nuevoPassword);
    }
  }

  onEstablecerPassword(nuevoPassword: NuevaPassWordUser) {

    this.spinnerService.setTitulo = 'Estableciendo contraseña, espere un momento por favor...';
    this.userService.establecerPassword(nuevoPassword).subscribe(async (exito: UsuarioApiResponse) => {

      this.spinnerService.setTitulo = '';
      if (exito.result === 'OK') {
        // show alert success
        const alertSuccess = await this.alertCtrl.create({
          cssClass: 'alertSuccess',
          message: this.helperService.getMessageAlert(`La contraseña se estableció exitosamente.`, 'success'),
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
        this.elrouter.navigate(['/login']);
      }

    }, async (error) => {

      this.spinnerService.setTitulo = '';
      const alertValidateData = await this.alertCtrl.create({
        cssClass: 'alertWarning',
        message: this.helperService.getMessageAlert(`${error.error.error}`, 'warning'),
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

  onCambiarPassword(nuevoPassword: NuevaPassWordUser) {


    console.log('entra aqui onCambiarPassword');


    this.spinnerService.setTitulo = 'Cambiando contraseña, espere un momento por favor...';
    this.userService.cambiarPassword(nuevoPassword).subscribe(async (exito: UsuarioApiResponse) => {

      this.spinnerService.setTitulo = '';
      if (exito.result === 'OK') {
        // show alert success
        const alertSuccess = await this.alertCtrl.create({
          cssClass: 'alertSuccess',
          message: this.helperService.getMessageAlert(`La contraseña se cambio exitosamente,
          sera redirigido al Login para que inicie sesión con su nueva contraseña. `, 'success'),
          animated: true,
          backdropDismiss: false,
          buttons: [
            {
              text: 'Aceptar',
              cssClass: 'alertButton',
              id: 'confirm-button',
              handler: () => {
                this.modalCtrl.dismiss({
                  close: true
                });
                this.helperService.logout();
              }
            }]
        });
        await alertSuccess.present();
      }

    }, async (error) => {
      this.spinnerService.setTitulo = '';
      const alertValidateData = await this.alertCtrl.create({
        cssClass: 'alertWarning',
        message: this.helperService.getMessageAlert(`${error.error.error}`, 'warning'),
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

  validateLink(elLink: string) {


    
    this.helperService.validarLink(elLink).subscribe(async (exito) => {

      if (exito.result === 'OK') {
        this.linkExpiro = exito.dtoResult.vigente;

        if (this.linkExpiro === false) {
          this.mensajeErr = exito.dtoResult.message;
          const alertMsj = await this.alertCtrl.create({
            cssClass: 'alertDanger',
            message: this.helperService
              .getMessageAlert(`${exito.dtoResult.message}`
                , 'danger'),
            buttons: [
              {
                text: 'Aceptar',
                cssClass: 'alertButton',
                id: 'confirm-button',
                handler: () => {
                }
              }]
          });
          await alertMsj.present();
        }
      }

    }
    );
  }



}

