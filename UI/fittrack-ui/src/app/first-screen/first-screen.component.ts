import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-first-screen',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './first-screen.component.html',
  styleUrl: './first-screen.component.css'
})
export class FirstScreenComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
