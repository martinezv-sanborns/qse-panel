import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OlvidePasswordComponent } from '../components/common/olvide-password/olvide-password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  logueando = false;

  constructor(private formB: FormBuilder,
    //private authService: AuthService,
   // private helperService: HelperService,
   // private spinnerService: SpinnerService,
  //  private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private elrouter: Router,
//    private portalService: CambioPortalService
  ) { }




  
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

  login(){}


}
