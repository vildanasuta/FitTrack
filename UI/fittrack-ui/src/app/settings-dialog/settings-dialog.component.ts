import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatLabel } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [
    MatOption,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
    NgIf,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    PopupComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.css'
})
export class SettingsDialogComponent {
  goalTypes: any[] = [];
  selectedGoalType: any;
  value: number = 0;
  selectedGoalTypeId: any;
  dataLoaded: boolean = false;
  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchSavedData();
  }

  @Output() settingsSaved = new EventEmitter<void>();


  async fetchSavedData() {
    const token = localStorage.getItem('token');
    const userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    const userId = userData.userId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    await this.http.get<any>(`http://localhost:7125/GoalType`, { headers }).subscribe({
      next: (goalTypesResponse) => {
        this.goalTypes = goalTypesResponse.result.$values;
      },
      error: (error) => {
        console.error('Error fetching goal types:', error);
      }
    });


    await this.http.get<any>(`http://localhost:7125/UserSetting/${userId}`, { headers }).subscribe({
      next: (userData) => {
        this.selectedGoalTypeId = userData.goalTypeId;
        this.dataLoaded = true;
        const selectedGoalTypeFind = this.goalTypes.find(goalType => goalType.goalTypeId === this.selectedGoalTypeId);
        if (selectedGoalTypeFind) {
          this.selectedGoalType = selectedGoalTypeFind.goalTypeId;
          this.value = userData.goalValue;
        }
      },
      error: (userError) => {
        console.error('Error fetching user data:', userError);
      }
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }

  async saveSettings() {
    const selectedGoalType = this.goalTypes.find(goalType => goalType.goalTypeId === this.selectedGoalType);
    if (selectedGoalType) {
      const token = localStorage.getItem('token');
      const userObject = localStorage.getItem('user');
      const userData = JSON.parse(userObject!);
      const userId = userData.userId;

      const requestBody = {
        userId: userId,
        goalTypeId: this.selectedGoalType,
        goalValue: this.value
      };

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      await this.http.put<any>(`http://localhost:7125/UserSetting/${userId}`, requestBody, { headers }).subscribe({
        next: (response) => {
          this.settingsSaved.emit();
        },
        error: (error) => {
          console.error('Error saving settings:', error);
        }
      });
    }

    this.fetchSavedData();
    this.dialogRef.close();
  }

  formatGoalTypeName(name: string): string {
    const words = name.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
