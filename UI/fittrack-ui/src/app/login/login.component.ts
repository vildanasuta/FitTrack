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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private http: HttpClient, private router: Router) { }

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
    this.router.navigate(['/dashboard']);
    //need to implement further logic
  },
  error: (error) => {
    console.error('Error logging in user:', error);
  }
});

  }

}
