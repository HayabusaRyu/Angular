import * as colorette from 'colorette';

export enum MonsterType {
  PLANT = "plant",
  ELECTRIC = "electric",
  FIRE = "fire",
  WATER = "water"
}


export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: {[key: string] : IMonsterProperties} = {
  [MonsterType.PLANT]: {
    imageUrl: '/images/energy-plant.jpg',
    color: 'rgba(135,255,124)'
  },
  [MonsterType.ELECTRIC]: {
    imageUrl: '/images/energy-electric.jpg',
    color: 'rgba(255,255,5)'
  },
  [MonsterType.FIRE]: {
    imageUrl: '/images/energy-fire.jpg',
    color: 'rgba(255,104,104)'
  },
  [MonsterType.WATER]: {
    imageUrl: '/images/energy-water.jpg',
    color: 'rgba(47,137,205)'
  }

}
