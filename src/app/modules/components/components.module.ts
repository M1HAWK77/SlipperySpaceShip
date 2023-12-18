import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RocketComponent } from './rocket/rocket.component';
import { ObstructionComponent } from './obstruction/obstruction.component';
import { ModalPlayerComponent } from './modal-player/modal-player.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RocketComponent,
    ObstructionComponent,
    ModalPlayerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports:[
    RocketComponent,
    ObstructionComponent,
    ModalPlayerComponent
  ]
})
export class ComponentsModule { }
