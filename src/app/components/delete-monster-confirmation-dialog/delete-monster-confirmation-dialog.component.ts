import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-delete-monster-confirmation-dialog',
  imports: [MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, MatButtonModule],
  templateUrl: './delete-monster-confirmation-dialog.component.html',
  standalone: true,
  styleUrl: './delete-monster-confirmation-dialog.component.css'
})
export class DeleteMonsterConfirmationDialogComponent {

}
