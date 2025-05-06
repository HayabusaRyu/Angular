import {MonsterType} from '../utils/monster.utils';
import {IMonster} from '../interfaces/monster.interface';

export class Monster implements IMonster {

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

  static fromJson(monsterJson: IMonster): Monster {
    return Object.assign(new Monster(), monsterJson);
  }

  toJson(): IMonster {
    const monsterJson: IMonster = Object.assign({}, this);
    delete monsterJson.id;
    return monsterJson;
  }
}
