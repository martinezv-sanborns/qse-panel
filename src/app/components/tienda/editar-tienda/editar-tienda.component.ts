import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { TiendaResponse } from 'src/app/models/response/tiendaresponse.model';

@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.component.html',
  styleUrls: ['./editar-tienda.component.scss'],
})
export class EditarTiendaComponent implements OnInit {
  @Input() laTienda: TiendaResponse;
  tiendaFormeditar: FormGroup;
  hourLandingaper: string;
  hourLandingcierre: string;
  checkedItems = [];


  indeterminateState: boolean;
  checkParent: boolean;
  Checkboxes: any;


  constructor(public modalCrtl: ModalController, private fb: FormBuilder) {    
    this.Checkboxes = [
    {
      value: "Captain Marvel",
      isItemChecked: false
    }, {
      value: "Thor",
      isItemChecked: false
    }, {
      value: "Iron Man",
      isItemChecked: false
    }, {
      value: "Spider Man",
      isItemChecked: false
    }, {
      value: "Loki",
      isItemChecked: false
    }
  ];
}

// formatDate(value: string) {
//   this.modalCrtl.dismiss();
//   this.hourLandingaper=format(parseISO(value), 'HH:mm');
//   console.log('FECHA', this.hourLandingaper);
//   return format(parseISO(value), 'HH:mm');
// }

// formatDate1(value: string) {
//   this.modalCrtl.dismiss();
//   this.hourLandingcierre=format(parseISO(value), 'HH:mm');
//   console.log('FECHA', this.hourLandingcierre);
//   return format(parseISO(value), 'HH:mm');
// }

  ngOnInit() {

    this.hourLandingaper = this.laTienda.apertura;
    this.hourLandingcierre = this.laTienda.cierre;
    console.log('SE PASA LA TIENDA', this.laTienda);
this.CargarFormulario();
  }

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true
    });
  }

  editarTienda()
  {}

  // get nombreNoValido() {
  //   return this.tiendaFormeditar.get('nombre').invalid && this.tiendaFormeditar.get('nombre').touched;
  // }

  // get identificadorNoValido() {
  //   return this.tiendaFormeditar.get('identificador').invalid && this.tiendaFormeditar.get('identificador').touched;
  // }

  // get emailNoValido() {
  //   return this.tiendaFormeditar.get('email').invalid && this.tiendaFormeditar.get('email').touched;
  // }


  onChange(item) {
    console.log('Item checado', item);
    this.checkedItems =[];
      if(this.checkedItems.includes(item)) {
        this.checkedItems = this.checkedItems.filter((value)=>value!=item);
      } else {
        this.checkedItems.push(item)
      }
  }

  checkCheckbox() {
    setTimeout(() => {
      this.Checkboxes.forEach(item => {
        item.isItemChecked = this.checkParent;
      });
    });
  }
  verifyEvent() {
    const allItems = this.Checkboxes.length;
    let selected = 0;
    this.Checkboxes.map(item => {
      if (item.isItemChecked) selected++;
    });
    if (selected > 0 && selected < allItems) {
      // One item is selected among all checkbox elements
      this.indeterminateState = true;
      this.checkParent = false;
    } else if (selected == allItems) {
      // All item selected
      this.checkParent = true;
      this.indeterminateState = false;
    } else {
      // No item is selected
      this.indeterminateState = false;
      this.checkParent = false;
    }
  }

  CargarFormulario(){
    this.tiendaFormeditar = this.fb.group({
      nombre:[this.laTienda.nombre, [Validators.required, Validators.minLength(4)]],
      identificador:[this.laTienda.identificadorExterno, [Validators.required, Validators.minLength(4)]],
      nombrecorto:[this.laTienda.nombreCorto],
      email:[this.laTienda.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      coordenadas:[this.laTienda.coordenadas],
      // apertura:['', [Validators.required]],
      // cierre:['', [Validators.required]],
      zona:[this.Checkboxes, [Validators.required]],
      checkedItems : ['']
    })
    this.hourLandingaper=this.laTienda.apertura;
    this.hourLandingcierre =this.laTienda.cierre;

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

  
}
