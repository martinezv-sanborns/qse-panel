import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DiaSemana } from 'src/app/models/helper.model';
import { HelperService } from 'src/app/services/helper.service';
import { format, parseISO } from 'date-fns';

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
  
  hourLanding = '';

  constructor(private fb: FormBuilder, private modalCrtl: ModalController, private helperService: HelperService) { }

  ngOnInit() {


    console.log('Dias Semana', this.listaDiasSemana);
    this.CargarFormulario();
  }

  cerrarModal() {
    this.modalCrtl.dismiss({
      close: true
    });
  }

  crearTienda(){}

  CargarFormulario(){
    this.tiendaForm = this.fb.group({
      nombre:[''],
      identificador:[''],
      nombrecorte:[''],
      email:[''],
      coordenadas:[''],
      apertura:[''],
      cierre:[''],
      zona:['']
    })

    this.hourLanding='';
  }

  formatDate(value: string) {
    this.modalCrtl.dismiss();
    return format(parseISO(value), 'HH:mm');
  }
  
  onChange(item) {
    console.log('Item checado', item);
    if(this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value)=>value!=item);
    } else {
      this.checkedItems.push(item)
    }
    console.log('Lista', this.checkedItems)
  }

  checkMaster(eve) {
    setTimeout(()=>{
      this.checkedItems.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }
}
