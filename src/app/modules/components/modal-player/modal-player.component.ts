import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-modal-player',
  templateUrl: './modal-player.component.html',
  styleUrls: ['./modal-player.component.scss'],
})
export class ModalPlayerComponent implements OnInit {
  @Input() score!: number;
  //get data to compare names
  players = this._dbService.getUsers();


  constructor(private _dbService: DatabaseService) { }

  ngOnInit() { }

  formPlayer = new FormGroup({
    "name": new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
    "score": new FormControl(this.score)
  })

  async registerPlayerScore() {
    const player: any = {
      namePlayer: this.formPlayer.get('name')?.value || '',
      scorePlayer: this.score
    }

    for (let pl of this.players()) {
      if (pl.userName === player.namePlayer) {
        alert(`El usuario ${pl.userName} ya existe, ingrese otro nombre`);
        return 
      }
    }
    await this._dbService.addPlayer(player.namePlayer, player.scorePlayer);
    this.formPlayer.reset();
  }


}
