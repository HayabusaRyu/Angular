import {Component, computed, inject, model} from '@angular/core';
import {PlayingCardComponent} from '../../components/playing-card/playing-card.component';
import {SearchBarComponent} from '../../components/search-bar/search-bar.component';
import {MonsterService} from '../../services/monster/monster.service';
import {Monster} from '../../models/monster.model';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [
    CommonModule,
    PlayingCardComponent,
    SearchBarComponent
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

  private router = inject(Router);

  private monsterService = inject(MonsterService);

  monsters = toSignal(this.monsterService.getAll());
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters()?.filter(monster => monster.name.includes(this.search())) ?? [];
  })

  addMonster(){
    this.router.navigate(['monster']);
  }

  openMonster(monster : Monster) {
    this.router.navigate(['monster', monster.id]);
  }
}
