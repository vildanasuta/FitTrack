import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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

this.http.post<any>('http://localhost:7125/User', {
  username: this.username,
  password: this.password,
  email: this.email,
}, { headers }).subscribe({
  next: (response) => {
    console.log('User registered successfully:', response);
  },
  error: (error) => {
    console.error('Error registering user:', error);
  }
});

  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
