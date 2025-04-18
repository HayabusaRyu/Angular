import {Component, computed, input, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Monster} from '../../models/monster.model';
import {MonsterTypeProperties} from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent {


  monster = input(new Monster());
  monsterTypeIcon = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl
  })
  backgroundColor = computed(() => {
    return MonsterTypeProperties[this.monster().type].color
  })

}
