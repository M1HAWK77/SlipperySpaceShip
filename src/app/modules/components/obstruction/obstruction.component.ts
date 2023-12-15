import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-obstruction',
  templateUrl: './obstruction.component.html',
  styleUrls: ['./obstruction.component.scss'],
})
export class ObstructionComponent  implements OnInit {
  //receive params
  @Input() height!:number;
  @Input() width!:number;
  //empujar el avion segun gravedad
  @Input() top!:number;
  @Input() left!:number;
  @Input() rotation!:number;


  constructor() { }

  ngOnInit() {}

}
