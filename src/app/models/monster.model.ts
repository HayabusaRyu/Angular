import {MonsterType} from '../utils/monster.utils';

export class Monster{

  id: number = -1;
  name: string = "My Monster";
  image: string = "/images/pika.jpg";
  type: MonsterType = MonsterType.ELECTRIC;
  hp: number = 40;
  figureCaption: string = "N°045";

  attackName: string = "Geo impact";
  attackStrength: number = 60;
  attackDescription: string = "This is a long description of a monster attack. probably something to od with electricity...";

  copy(): Monster {
    return Object.assign(new Monster(), this);
  }
}
