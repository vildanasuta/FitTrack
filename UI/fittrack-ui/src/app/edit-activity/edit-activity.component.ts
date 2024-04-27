import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewAllActivitiesComponent } from '../view-all-activities/view-all-activities.component';

@Component({
  selector: 'app-edit-activity',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatInput,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatOptionModule,
    CommonModule,
    NgIf,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogTitle, 
    HttpClientModule
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.css'
})
export class EditActivityComponent implements OnInit {

  formData: any = {
    title: '',
    description: '',
    activityDate: null,
    activityTime: null,
    durationInMinutes: 0,
    activityTypeId: 0
  };
  activityTypes: any[]=[];
  activity:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dialogRef: MatDialogRef<EditActivityComponent>) {
    this.activityTypes = data.activityTypes;
    this.activity = data.activity;
  }

  ngOnInit(): void {
    this.formData.title = this.activity.title;
    this.formData.description = this.activity.description;
    this.formData.activityDate = this.activity.activityDate;
    this.formData.activityTime = this.activity.activityTime;
    this.formData.durationInMinutes = this.activity.durationInMinutes;
    this.formData.activityTypeId = this.activity.activityTypeId;
  }

  formatDate(date: any) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  async submitForm(){
    const token = localStorage.getItem('token');
    const userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    const userId = userData.userId;

    const requestBody = {
      fitnessActivityId : this.activity.fitnessActivityId,
      title: this.formData.title,
      description: this.formData.description,
      activityDate: this.formatDate(this.formData.activityDate),
      activityTime: this.formData.activityTime,
      durationInMinutes: this.formData.durationInMinutes,
      userId: userId,
      activityTypeId: this.formData.activityTypeId
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

   await this.http.put<any>(`http://localhost:7125/FitnessActivity/${this.activity.fitnessActivityId}`, requestBody, { headers }).subscribe({
      next: (response) => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error saving settings:', error);
      }
    });
  }

}
