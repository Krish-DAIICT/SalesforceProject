import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrl: './oauth.component.scss'
})
export class OauthComponent implements OnInit{
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.handleCallback().subscribe({
      next: ((val) =>{
        this.authService.redirectToUrl('home');
      }),
      error: ((err) => {
        console.error(err);
      })
    });
  }
}
