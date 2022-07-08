import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() entradaCadenaName: string;

  @ViewChild('productbtn', { read: ElementRef }) productbtn: ElementRef;
  dropdown = false;

  constructor( private popVerCtrl: PopoverController,) { }

  ngOnInit() {

  }

  async mostrarMenu(evento: any) {
    // const popover = await this.popVerCtrl.create({
    //   component: LoginMenuComponent,
    //   componentProps: {
    //   },
    //   cssClass: 'my-custom-class',
    //   event: evento,
    //   mode: 'ios',
    //   backdropDismiss: true,
    //   translucent: true
    // });
    // await popover.present();

    // const { data } = await popover.onDidDismiss();

    // if (data !== undefined) {
    //   switch (data.item.id) {
    //     case 'close-sesion':

    //       break;
    //     case 'show-perfil':

    //       break;
    //     case 'change-cadena':

    //       break;
    //     case 'change-password':

    //       break;
    //     default:
    //       break;
    //   }
    // }

  }

  hideDropdown(event) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;

    const rect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
  }

}
