import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    NgIf,
    HttpClientModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { }

  onSubmit() {
const headers = new HttpHeaders({
  'accept': 'text/plain',
  'Content-Type': 'application/json',
});

this.http.post<any>('http://localhost:7125/User/login', {
      email: this.email,
      password: this.password,
    }, { headers }).subscribe({
      next: (response) => {
        console.log('User logged in successfully:', response);
        localStorage.setItem('token', response.token);
        const userId = response.userId;

        this.http.get<any>(`http://localhost:7125/User/${userId}`).subscribe({
          next: (userData) => {
            console.log('User data retrieved successfully:', userData);
            localStorage.setItem('user', JSON.stringify(userData));
            this.router.navigate(['/dashboard']);
          },
          error: (userError) => {
            console.error('Error fetching user data:', userError);
          }
        });
      },
  error: (error) => {
    if(error.status==401 || error.status==400){
      this.openDialog("Credentials are not valid. Please check your input!");
    }
    console.error('Error logging in user:', error);
  }
});

  }
  openDialog(message: string): void {
    this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message: message }
    });
  }

  goToRegistration(){
    this.router.navigate(['/register']);
  }

}
