import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { NewActivityDialogComponent } from '../new-activity-dialog/new-activity-dialog.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ViewAllActivitiesComponent } from '../view-all-activities/view-all-activities.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: any;
  email: any;
  acitivities: any[] = [];
  activitiesByDay: { [key: string]: any[] } = {};
  past7Days: any[] = [];
  dayColors: { [key: string]: string } = {};
  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    var userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    this.username = userData.username;
    this.email = userData.email;

    this.getGoalTypeForUser();
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      this.past7Days.push(date);
    }
    this.past7Days.forEach(async (date: any) => {
      var formattedDate = this.formatDate(date);
      await this.getActivitiesForUserByDay(formattedDate);
    });
  }
  async getGoalTypeForUser() {
    const token = localStorage.getItem('token');
    var userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    await this.http.get<any>(`http://localhost:7125/UserSetting/${userData.userId}`, { headers }).subscribe({
      next: async (userData) => {
        const goalValue = userData.goalValue;
        await this.http.get<any>(`http://localhost:7125/GoalType/${userData.goalTypeId}`, { headers }).subscribe({
          next: (userData) => {
            const typeOfGoal=userData.name;

            this.checkUserActivitiesAgainstGoal(goalValue, typeOfGoal);
          },
          error: (userError) => {
            console.error('Error fetching user data:', userError);
          }
        });
      },
      error: (userError) => {
        console.error('Error fetching user data:', userError);
      }
    });
  }
  checkUserActivitiesAgainstGoal(goalValue: any, typeOfGoal: any) {
    let color = '';
    if (typeOfGoal === 'daily_activity_count') {
      this.past7Days.forEach((date: any) => {
        const formattedDate = this.formatDate(date);
        const activitiesForDay = this.activitiesByDay[formattedDate] || [];
        if (activitiesForDay.length < goalValue) {
          color='red';
        }
        else{
          color="green";
        }
        this.dayColors[formattedDate]=color;
      });
    } else if (typeOfGoal === 'daily_activity_duration') {
      this.past7Days.forEach((date: any) => {
        const formattedDate = this.formatDate(date);
        const activitiesForDay = this.activitiesByDay[formattedDate] || [];
        const totalDurationForDay = activitiesForDay.reduce((total: number, activity: any) => {
          return total + activity.durationInMinutes; 
        }, 0);
  
        if (totalDurationForDay < goalValue) {
          color="red";
        }
        else{
          color="green";
        }
        this.dayColors[formattedDate]=color;
      });
    }
  }
  formatDate(date: any) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  openSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '300px'
    });
    this.reloadData();
    dialogRef.componentInstance.settingsSaved.subscribe(() => {
      this.reloadData();
    });
  }

  async reloadData() {
    await this.getGoalTypeForUser();
  }

  openNewActivity() {
    const dialogRef = this.dialog.open(NewActivityDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('reload');
      location.reload();
    });

    dialogRef.componentInstance.newActivitySaved.subscribe(() => {
      location.reload();
    });
  }

  viewAllActivities(){
    const dialogRef = this.dialog.open(ViewAllActivitiesComponent, {
      width: '800px'
    });

    dialogRef.componentInstance.allActivitiesUpdated.subscribe(() => {
      location.reload();
    });
  }


  async getActivitiesForUserByDay(date: any) {

    const token = localStorage.getItem('token');
    const userObject = localStorage.getItem('user');
    const userData = JSON.parse(userObject!);
    const userId = userData.userId;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let params = new HttpParams()
      .set('userId', userId)
      .set('date', date);

    await this.http.get<any>('http://localhost:7125/FitnessActivity/filterByUserAndDate', { params, headers }).subscribe({
      next: (response) => {
        if (response && response.$values) {
          response.$values.forEach((activity: any) => {
            if (activity) {
              var activityDate = activity.activityDate;
              if (!this.activitiesByDay[activityDate]) {
                this.activitiesByDay[activityDate] = [];
              }

              this.activitiesByDay[activityDate].push(activity);
            }
          });
        }

      },
      error: (error) => {
        console.error('Error fetching activity types:', error);
      }
    });

  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
