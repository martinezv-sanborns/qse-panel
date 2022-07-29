import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time-ago.pipe';
import { PhonePipe } from './phone.pipe';



@NgModule({
  declarations: [TimeAgoPipe, PhonePipe],
  imports: [
    CommonModule
  ],
  exports:[TimeAgoPipe, PhonePipe]
})
export class PipesModule { }
