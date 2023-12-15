import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RocketComponent } from './rocket/rocket.component';
import { ObstructionComponent } from './obstruction/obstruction.component';



@NgModule({
  declarations: [
    RocketComponent,
    ObstructionComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RocketComponent,
    ObstructionComponent
  ]
})
export class ComponentsModule { }
