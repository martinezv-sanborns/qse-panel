import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  
  menuItems = [
    {
      title: 'Home',
      icon:'home',
      path:'/'
    },
    {
      title: 'Tickets',
      icon:'add',
      path:'/tickets'
    },
    {
      title: 'Usuarios',
      icon:'user',
      path:'/usuarios'
    },
 ];

 title = 'Home';

  constructor(private menuCtrl: MenuController, private plt: Platform) { }

  ngOnInit() {
    const width = this.plt.width();
    this.toggleMenu(width);
  }

   // eslint-disable-next-line @typescript-eslint/member-ordering
 @HostListener('window:resize', ['$event'])
 private onResize(event) {
   const newWidth = event.target.innerWidth;
   this.toggleMenu(newWidth);
 }
 
  toggleMenu(width) {
    if (width > 768) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
  }
 
  setTitle(title) {
    this.title = title;
  }
}
