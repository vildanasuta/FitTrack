import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogActions } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatDialogActions,
    MatButtonModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }
}
