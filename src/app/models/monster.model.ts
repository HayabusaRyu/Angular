import {MonsterType} from '../utils/monster.utils';
import {IMonster} from '../interfaces/monster.interface';

export class Monster implements IMonster{

  id: number | undefined = -1;
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
    const monster = new Monster();
    monster.id = monsterJson.id ?? -1;
    monster.name = monsterJson.name;
    monster.image = monsterJson.image;
    monster.hp = monsterJson.hp;
    monster.type = monsterJson.type;
    monster.figureCaption = monsterJson.figureCaption;
    monster.attackName = monsterJson.attackName;
    monster.attackStrength = monsterJson.attackStrength;
    monster.attackDescription = monsterJson.attackDescription;
    return monster;
  }

  toJson(): IMonster {
    const { id, ...rest } = this; // Exclude id for POST
    return rest as IMonster;
  }
}
