import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //game variable-----------------------
  containerHeight!: number;
  containerWidth!: number;

  //boolean to know if the game has been started
  gameStarted: boolean = false;
  gameOver: boolean = false;

  //score
  score: number = 0;

  //music
  musicActive: boolean = false;
  audio = new Audio('../../assets/assets_flappy_bird_ionic/music/ionic-bird-track.MP3')

  //plane height
  planeHeight: number = 40;
  planeWidth: number = 100;
  planePosition: number = 300;

  //Obstacle
  obstacleHeight: number = 0;
  obstacleWidth: number = 52;
  // obstaclePosition!:number;
  obstaclePosition: number = this.containerWidth;
  obstacleGap: number = 200;


  //to execute my gravity method
  // planeInterval!:NodeJS.Timeout;
  planeInterval!: number;
  obstacleInterval!: number;



  //minuto 20

  constructor(
    //the container increase or decrease depends the platform whether web or mobile
    private platform: Platform) { }


  ngOnInit(): void {
    this.setContainerSize();
    //execute a portion of code every so often
    this.planeInterval = window.setInterval(this.addGravity.bind(this), 24);
    this.obstacleInterval = window.setInterval(this.moveObstacle.bind(this), 24);
  }



  //----container size
  setContainerSize() {
    this.containerHeight = this.platform.height();
    this.containerWidth = this.platform.width() < 576 ? this.platform.width() : 576;
  }

  //start game
  startGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
  }

  //add gravity to my plane
  addGravity() {
    let gravity = 4.5;
    if (this.gameStarted) {
      this.planePosition += gravity;
    }
  }

  //plane jump functionality
  jump() {
    //validate the game started (if game started is true)
    if (this.gameStarted) {
      if (this.planePosition < this.planeHeight) { this.planePosition = 0; }
      else { this.planePosition -= 60 }
    }
  }

  // Funciones para mover los obstaculos
  moveObstacle(){
    //asigno velocidad para mover el obstaculo
    let speed: number=6;
    // en dispositivos moviles no puede ser tan rapido esto asi que menoramos la velocidad
    if (this.containerWidth < 400) speed=4;
      if(this.gameStarted && this.obstaclePosition >= -this.obstacleWidth) this.obstaclePosition -= speed;
      else{
        this.resetObstaclePosition();
        if(this.gameStarted) this.score++;
      }

      this.checkColisions();
  }

  resetObstaclePosition(){
    this.obstaclePosition=this.containerWidth;
    this.obstacleHeight=Math.floor(Math.random()*(this.containerHeight-this.obstacleGap))
  }


  setGameOver(){
    this.gameStarted=false;
    this.gameOver=true;
    this.planePosition=300;
  }

  checkColisions(){
    let topObstacleCollision=this.planePosition >= 0 && this.planePosition < this.obstacleHeight;
    let bottomObstacleCollision=this.planePosition >= this.containerHeight-(this.containerHeight-this.obstacleGap-this.obstacleHeight)-this.planeHeight;

    let floorCollision=(this.planePosition+40)>= this.containerHeight;
    
    if(floorCollision) this.setGameOver();

    if(this.obstaclePosition >= this.obstacleWidth && this.obstaclePosition <= this.obstacleWidth+80
      && (topObstacleCollision||bottomObstacleCollision)){
        this.setGameOver();
      }


  }


  playMusic() {
    this.musicActive = !this.musicActive;

    if (!this.musicActive) {
      this.audio.play();
      this.audio.loop;
    } else {
      this.audio.pause();
    }
  }


}
