import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-outh',
  templateUrl: './check-outh.component.html',
  styleUrl: './check-outh.component.scss'
})
export class CheckOuthComponent implements OnInit{
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) this.authService.redirectToUrl('home');
    else{
      this.performAuthOp();
    }
  }

  performAuthOp(){
    this.authService.initiateAuthorization();
    this.authService.handleCallback().subscribe({
      next: (val) => console.log(val)
    });
  }
}
