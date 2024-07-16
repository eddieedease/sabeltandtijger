import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // ... other metadata
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}