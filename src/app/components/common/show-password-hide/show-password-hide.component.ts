import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-show-password-hide',
  templateUrl: './show-password-hide.component.html',
  styleUrls: ['./show-password-hide.component.scss'],
})
export class ShowPasswordHideComponent implements OnInit {
  
  showPassword = false;
  @ContentChild(IonInput) input: IonInput;
  constructor() { }

  ngOnInit() {}

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }

}
