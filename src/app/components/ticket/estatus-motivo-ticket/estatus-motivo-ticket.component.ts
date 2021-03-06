import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import Swal from 'sweetalert2';
import { EstatusResponse } from '../../../models/response/estatus.model';


@Component({
  selector: 'app-estatus-motivo-ticket',
  templateUrl: './estatus-motivo-ticket.component.html',
  styleUrls: ['./estatus-motivo-ticket.component.scss'],
})
export class EstatusMotivoTicketComponent implements OnInit {
  @Input() icon: string;
  @Input() titleWindow: string;
  @Input() txtMessage: string;
  @Input() messageErr: string;
  @Input() titleErr: string;
  @Input() accion: string;


  estatusForm: FormGroup;

  constructor(private fb: FormBuilder,
    private modalCtrl: ModalController) { }

    ngOnInit() {
      this.cargarFormulario();
    }

    cerrarModal(){
      this.modalCtrl.dismiss({
        close: true,
        motivoSend: false
      });
    }

    enviarMotivoEstatus(){
      if (this.estatusForm.invalid) {

        return Object.values(this.estatusForm.controls).forEach(async (control, index) => {

          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(controlHijo => controlHijo.markAsTouched());
          } else {
            control.markAsTouched();
          }

          if (index === 0) {
            Swal.fire({
              icon: 'warning',
              title: this.titleErr,
              text: `${ this.messageErr }`,
              iconColor: '#eb445a',
              confirmButtonColor: '#eb445a',
              heightAuto: false
            });
          }

        });
      }

      const validateMotivo: string = this.estatusForm.value.motivo;
      if(validateMotivo.trim() === ''){
        Swal.fire({
          icon: 'warning',
          title: this.titleErr,
          text: `Por favor escriba algo sobre el caso`,
          iconColor: '#eb445a',
          confirmButtonColor: '#eb445a',
          heightAuto: false
        });
        return;
      }

      // Send Motivo
      this.modalCtrl.dismiss({
        close: false,
        motivoSend: true,
        motivo: this.estatusForm.value.motivo,
        esCerrarCaso: this.estatusForm.value.ckCerrarCaso
      });
    }

    cargarFormulario() {
      this.estatusForm = this.fb.group({
        motivo: ['', Validators.required],
        ckCerrarCaso: [false]
      });
    }

  }
