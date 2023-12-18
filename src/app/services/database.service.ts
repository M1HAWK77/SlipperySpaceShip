import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

const DBPLAYERS = 'players'

export interface Player {
  userName: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  // connection with the Database, it contains operation to manage the database
  private db!: SQLiteDBConnection;
  // signal which could be wrote and read, all parts when whe call it we could see the changes
  private player: WritableSignal<Player[]> = signal<Player[]>([]);

  constructor() { }

  // initialize connection to our database
  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      DBPLAYERS,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();
    console.log("la base de datos se creo sin problemas")
    // define table
    const schema = 'CREATE TABLE IF NOT EXISTS players(name VARCHAR(30) NOT NULL, score number NOT NULL);'
    await this.db.execute(schema);
    this.loadPlayers();
    return true;
  }

  async loadPlayers(){
    // const players= await this.db.query('SELECT * FROM players;');
    const players= await this.db.query('SELECT * FROM players ORDER BY score DESC LIMIT 5;');
    if (players.values) {
      this.player.set(players.values.map(player => ({
        userName: player['name'],
        score: player['score']
      })));
    } else {
      alert('No se encontraron jugadores en la base de datos');
    }
  }

  //CRUD
  getUsers(){
    return this.player;
  }

  async addPlayer(username:string, score:number){
    const query:string='INSERT INTO players (name, score) VALUES(?, ?)';
    const result=await this.db.query(query, [username, score]);
    this.loadPlayers();
    return result;
  }


}
