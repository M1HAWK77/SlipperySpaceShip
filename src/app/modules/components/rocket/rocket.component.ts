import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rocket',
  templateUrl: './rocket.component.html',
  styleUrls: ['./rocket.component.scss'],
})
export class RocketComponent  implements OnInit {

  //receive params
  @Input() height!:number;
  @Input() width!:number;
  //empujar el avion segun gravedad
  @Input() top!:number;

  constructor() { }

  ngOnInit() {}

}
