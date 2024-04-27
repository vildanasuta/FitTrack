import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    NgIf,
    HttpClientModule,
    PopupComponent,
    MatButtonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  emailNotValid: boolean = false;
  usernameNotValid: boolean = false;
  passwordNotValid: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  onSubmit() {

    this.emailNotValid = !this.isEmailValid(this.email);
    this.usernameNotValid = this.username.length < 5;
    this.passwordNotValid = this.password.length < 8;

    if (this.emailNotValid || this.usernameNotValid || this.passwordNotValid) {
      return;
    }

const headers = new HttpHeaders({
  'accept': 'text/plain',
  'Content-Type': 'application/json',
});

this.http.post<any>('http://localhost:7125/User/register', {
  username: this.username,
  password: this.password,
  email: this.email,
}, { headers })
.subscribe({
  next: (response) => {
    console.log('User registered successfully:', response);
    this.router.navigate(['/login']);
  },
  error: (error) => {
    if(error.status==400){
      this.openDialog(error.error.message);
    }


    console.error('Error registering user:', error);
  }
});

  }

  openDialog(message: string): void {
    this.dialog.open(PopupComponent, {
      width: '250px',
      data: { message: message }
    });
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
