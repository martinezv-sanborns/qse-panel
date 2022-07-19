import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { OlvidePasswordComponent } from '../../components/common/olvide-password/olvide-password.component';
import { AuthService } from '../../services/auth.service';
import { CadenaSelectorComponent } from '../../components/common/cadena-selector/cadena-selector.component';
import { CambioCadenaService } from 'src/app/services/cambio-cadena.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  logueando = false;
  private captchaPassed: boolean = false;
  private captchaResponse: string;
  token: string|undefined;


  constructor(private formB: FormBuilder,
    private authService: AuthService,
    private helperService: HelperService,
    private spinnerService: SpinnerService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private elrouter: Router,
    private canalService: CambioCadenaService,
  ) { 


    this.token = undefined;

  }


  
  ngOnInit() {

    this.loginForm = this.formB.group({
      nickname: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  get nickNameValido() {
    return this.loginForm.get('nickname').invalid && this.loginForm.get('nickname').touched;
  }

  get passwordValido() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }


  async onShowOlvidePassword() {
    // mostrar portal
    const modalShowPortal = await this.modalCtrl.create(
      {
        component: OlvidePasswordComponent,
        componentProps: {
        }
      }
    );
    await modalShowPortal.present();
    const { data } = await modalShowPortal.onWillDismiss();

    console.log('data seleccionada', data);
  }

 async login(){

    localStorage.clear();

    if(!this.captchaPassed){


    const alertValidateData = await this.alertCtrl.create({
        cssClass: 'alertWarning',
        message: this.helperService.getMessageAlert('Valide el captcha primero!', 'warning'),
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


    

    else if (this.loginForm.invalid) {

      return Object.values(this.loginForm.controls).forEach(async (control, index) => {

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

    else{


      this.logueando = true;
      this.spinnerService.setTitulo = 'Iniciando sesión...';
      this.authService.login(this.loginForm.value.nickname, this.loginForm.value.password)
        .subscribe(async (exito) => {
          this.logueando = false;
          this.spinnerService.setTitulo = '';
  
          if (exito.result === 'OK') {
            // mostrar portal
            const modalShowPortal = await this.modalCtrl.create(
              {
                backdropDismiss: false,
                component: CadenaSelectorComponent,
                componentProps: {
                  usuarioId:  localStorage.getItem('UserId')
                }
              }
            );
            await modalShowPortal.present();
            const { data } = await modalShowPortal.onWillDismiss();
  
            if (data !== undefined) {
  
              if (data.portalSelected) {
                localStorage.setItem('cadenaSelectedId', data.portalId);
                localStorage.setItem('cadenaName', data.name);
  
                this.canalService.onChangeadena();
  
                this.elrouter.navigate(['/home']);
              } else {
                const alertMsj = await this.alertCtrl.create({
                  cssClass: 'alertDanger',
                  message: this.helperService.getMessageAlert(`Debe seleccionar un portal`, 'danger'),
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
  
          if (exito.result === 'KO') {
            if (exito.error === 'Not authorized') {
  
              const alertMsj = await this.alertCtrl.create({
                cssClass: 'alertDanger',
                message: this.helperService.getMessageAlert(`Verifique sus datos de acceso`, 'danger'),
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
  
            } else {
  
  
              const msjErr = await this.alertCtrl.create({
                cssClass: 'alertDanger',
                message: this.helperService.getMessageAlert(`${exito.error}`, 'danger'),
                buttons: [{
                  text: 'Aceptar',
                  cssClass: 'alertButton',
                  id: 'confirm-button',
                  handler: () => {
                  }
                }]
              });
              await msjErr.present();
            }
  
  
          }
  
        }, async (err) => {
          console.log(err);
          this.spinnerService.setTitulo = '';
          this.logueando = false;
          const msjErr = await this.alertCtrl.create({
            cssClass: 'alertDanger',
            message: this.helperService.getMessageAlert(`Ocurrió un error por favor comuníquese con el administrador.`, 'danger'),
            buttons: [{
              text: 'Aceptar',
              cssClass: 'alertButton',
              id: 'confirm-button',
              handler: () => {
              }
            }]
          });
          await msjErr.present();
        });
    }

  }



  resolvedCaptcha(response: string) {
    if (response != null) {
      if (response !== null && response !== undefined) {
        this.captchaPassed = !this.captchaPassed;
      }
    }
  }


  }



