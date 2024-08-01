import { Component, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreService } from '../store.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './landing.component.html',
  styles: []
})



export class LandingComponent implements OnInit {

  // font awesome icons
  faUser = faUser;
  faHome = faHome;


  users: any[] = [];

  constructor(private dataService: StoreService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}