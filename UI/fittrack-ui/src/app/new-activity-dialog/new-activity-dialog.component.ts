import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatOptionModule } from '@angular/material/core';
import { MatOption } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
@Component({
  selector: 'app-new-activity-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormField,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButton,
    HttpClientModule,
    MatOptionModule,
    MatOption,
    MatSelectModule,
    MatSelect
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './new-activity-dialog.component.html',
  styleUrl: './new-activity-dialog.component.css'
})
export class NewActivityDialogComponent implements OnInit {
  activityForm: FormGroup;
  activityTypes: any[] = [];
  constructor(private fb: FormBuilder, private http: HttpClient, private dialogRef: MatDialogRef<SettingsDialogComponent>, private cdr: ChangeDetectorRef) {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      activityDate: ['', Validators.required],
      activityTime: ['', Validators.required],
      durationInMinutes: ['', Validators.required],
      activityType: ['',Validators.required],
    });
  }
  @Output() newActivitySaved = new EventEmitter<void>();

  ngOnInit(): void {
    this.getActivityTypes();
  }

  refreshView() {
    this.cdr.detectChanges();
  }
  async getActivityTypes() {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    await this.http.get<any>('http://localhost:7125/ActivityType', { headers }).subscribe({
      next: (response) => {
        const activityTypes = response['result']['$values'].map((activityType: any) => {
          return {
            activityTypeId: activityType.activityTypeId,
            name: activityType.name
          };
        });
        this.activityTypes = activityTypes;
      },
      error: (error) => {
        console.error('Error fetching activity types:', error);
      }
    });
  }

  async onSubmit() {
    const token = localStorage.getItem('token');
    const userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    const userId = userData.userId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if (this.activityForm.valid) {

      const activityDateValue = new Date(this.activityForm.value.activityDate);
      const year = activityDateValue.getFullYear();
      const month = (activityDateValue.getMonth() + 1).toString().padStart(2, '0');
      const day = activityDateValue.getDate().toString().padStart(2, '0');
      const formattedActivityDate = `${year}-${month}-${day}`;

      const activityTimeValue: string = this.activityForm.value.activityTime;
      const [hours, minutes] = activityTimeValue.split(':');
      const formattedActivityTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
      const formData = {
        ...this.activityForm.value,
        userId: userId,
        activityDate: formattedActivityDate,
        activityTime: formattedActivityTime,
        activityTypeId: this.activityForm.value.activityType
      };
      await this.http.post<any>(`http://localhost:7125/FitnessActivity`, formData, { headers }).subscribe({
        next: (response) => {
          this.newActivitySaved.emit();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error saving settings:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}