import { Component, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landing.component.html',
  styles: []
})



export class LandingComponent implements OnInit {
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