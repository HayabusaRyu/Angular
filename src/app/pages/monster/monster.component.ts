import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, Observable, of, Subscription, switchMap} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MonsterType} from '../../utils/monster.utils';
import {PlayingCardComponent} from '../../components/playing-card/playing-card.component';
import {Monster} from '../../models/monster.model';
import {MonsterService} from '../../services/monster/monster.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog} from '@angular/material/dialog';
import {
  DeleteMonsterConfirmationDialogComponent
} from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, PlayingCardComponent, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './monster.component.html',
  standalone: true,
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy{

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  private routeSubscription: Subscription | null = null;
  private saveSubscription: Subscription | null = null;
  private deleteSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;


  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    attackDescription: ['', [Validators.required]],
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterTypes = Object.values(MonsterType);
  monsterId = -1;
  private isInitializing = false;



  ngOnInit(): void {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      if (!this.isInitializing) {  // Skip during initialization
        this.monster = Object.assign(new Monster(), data);
      }
    });

    this.routeSubscription = this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.monsterId = parseInt(params['id'], 10);
          return this.monsterService.get(this.monsterId);
        }
        return of(null);
      })
    ).subscribe(monster => {
      if (monster) {
        this.isInitializing = true;  // Start initialization
        this.monster = monster;
        this.formGroup.patchValue(monster, { emitEvent: false });  // Disable valueChanges
        this.isInitializing = false;  // End initialization
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.formValuesSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

  navigateBack(){
    this.router.navigate(['/home']);
  }

  submit(event: Event){
    event.preventDefault();
    const monsterToSave = this.monster.copy();
    monsterToSave.id = this.monsterId !== -1 ? this.monsterId : undefined;

    let saveObservable: Observable<Monster>;
    if (this.monsterId === -1) {
      saveObservable = this.monsterService.add(monsterToSave);
    } else {
      saveObservable = this.monsterService.update(monsterToSave);
    }

    this.saveSubscription = saveObservable.subscribe(() => {
      this.navigateBack();
    });

  }

  deleteMonster(){
    const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);
    dialogRef.afterClosed().pipe(
      filter(confirmation => confirmation),
      switchMap(_ => this.monsterService.delete(this.monsterId))
    ).subscribe(_ => {
        this.navigateBack();
    })
  }

  isFieldValid(name: string){
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        })
      }
    }
  }
}
