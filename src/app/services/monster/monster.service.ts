import { Injectable } from '@angular/core';
import {Monster} from '../../models/monster.model';
import {MonsterType} from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  monsters: Monster[] = [];
  currentIndex : number = 1;

  constructor() {
    this.load();
  }

  private save(){
    localStorage.setItem('monsters', JSON.stringify(this.monsters))
  }

  private load(){
    const monsterData = localStorage.getItem('monsters');

    if(monsterData){
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) => Object.assign(new Monster(), monsterJSON));
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id))
    } else {
      this.init();
      this.save();
    }
  }

  private init() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.id = this.currentIndex++;
    monster1.name = "Pik";
    monster1.hp  = 12;
    monster1.figureCaption = "N°015 Pik";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = this.currentIndex++;
    monster2.image = "/images/cara.jpg";
    monster2.type = MonsterType.WATER
    monster2.name = "Car";
    monster2.hp  = 60;
    monster2.figureCaption = "N°004 Car";
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = this.currentIndex++;
    monster3.image = "/images/bulb.jpg";
    monster3.type = MonsterType.PLANT
    monster3.name = "Bulb";
    monster3.hp  = 40;
    monster3.figureCaption = "N°001 Bulb";
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = this.currentIndex++;
    monster4.image = "/images/sala.jpg";
    monster4.type = MonsterType.FIRE
    monster4.name = "Sala";
    monster4.hp  = 40;
    monster4.figureCaption = "N°007 Sala";
    this.monsters.push(monster4);
  }

  getAll() : Monster[] {
    return this.monsters.map(monster => monster.copy())
  }

  get(id : number): Monster | undefined {
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster : Monster): Monster {
    const monsterCopy = monster.copy();

    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();

    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === monster.id);
    if(monsterIndex){
      this.monsters[monsterIndex] = monsterCopy.copy();
      this.save();
    }

    return monsterCopy;
  }


  delete(id :number){
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === id);
    if(monsterIndex != -1){
      this.monsters.splice(monsterIndex, 1);
      this.save();
    }
  }
}
