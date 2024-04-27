import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule, NgModel } from '@angular/forms';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-view-all-activities',
  standalone: true,
  imports: [
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatIcon, 
    MatIconModule,
    CommonModule,
    MatButton,
    MatButtonModule,
    FormsModule,
    MatTooltipModule,
    MatTooltip,
    NgIf,
    MatDatepicker,
    MatDatepickerModule,
    MatSelect,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './view-all-activities.component.html',
  styleUrl: './view-all-activities.component.css'
})
export class ViewAllActivitiesComponent implements OnInit{
  allActivities: any[]=[];
  filteredActivities: any[] = [];
  searchQuery: string = '';
  dateFilter:any;
  typeFilter:any;
  activityTypes:any[]=[];

  @Output() allActivitiesUpdated = new EventEmitter<void>();
  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router, private dialogRef: MatDialogRef<DashboardComponent>) { }
  async ngOnInit(): Promise<void> {
    this.allActivities=await this.getAllActivitiesForUser();
    this.filteredActivities=this.allActivities;
    this.getActivityTypes();
  }

  async getAllActivitiesForUser():Promise<any>{

    const token = localStorage.getItem('token');
    const userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    const userId = userData.userId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    await this.http.get<any>('http://localhost:7125/FitnessActivity', {headers}).subscribe({
      next: (response: any) => {
        if (response && response.result && response.result.$values) {
          response.result.$values.forEach((activity: any) => {
            if (activity && activity.userId==userId) {
              this.allActivities.push(activity);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching activity types:', error);
      }
    });
    return this.allActivities;
  }
  
  formatDate(date: any) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  editActivity(activity:any){
    const dialogRef = this.dialog.open(EditActivityComponent, {
      width: '300px',
      data: { activity: activity, activityTypes: this.activityTypes } 
    });
  
    dialogRef.afterClosed().subscribe(async result => {
      location.reload();
    });
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

  async deleteActivity(activityId: any){
    const token = localStorage.getItem('token');
    const userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    const userId = userData.userId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    await this.http.delete<any>(`http://localhost:7125/FitnessActivity/${activityId}`, {headers}).subscribe({
      next: (response: any) => {
        this.filteredActivities = this.allActivities.filter(activity => activity.fitnessActivityId !== activityId);
      },
      error: (error) => {
        console.error('Error deleting activity:', error);
      }
    });
  }
  onSearch(): void {
    this.filteredActivities = this.allActivities.filter(activity => {
      let matchesSearch = true;
      let matchesDate = true;
      let matchesType = true;
  
      if (this.searchQuery) {
        matchesSearch = activity.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        (activity.description && activity.description.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
  
      if (this.dateFilter) {
        matchesDate = activity.activityDate === this.formatDate(this.dateFilter);
      }
  
      if (this.typeFilter) {
        matchesType = activity.activityTypeId === this.typeFilter;
      }
  
      return matchesSearch && matchesDate && matchesType;
    });
  }

  resetFilters(): void {
    this.dateFilter = null;
    this.typeFilter = null;
    this.onSearch();
  }
  
  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }
  
  
}
