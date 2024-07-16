import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SabelTandTijger';

  constructor(private router: Router) {}

  ngOnInit() {
    this.setupMobileMenu();
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMobileMenu();
      }
    });
  }

  setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuItems = mobileMenu?.querySelectorAll('a');

    if (mobileMenuButton && closeMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => this.openMobileMenu());
      closeMenuButton.addEventListener('click', () => this.closeMobileMenu());

      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target as Node) && !mobileMenuButton.contains(event.target as Node)) {
          this.closeMobileMenu();
        }
      });

      // Close menu when clicking on a menu item
      mobileMenuItems?.forEach(item => {
        item.addEventListener('click', () => this.closeMobileMenu());
      });
    }
  }

  openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu?.classList.remove('hidden');
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu?.classList.add('hidden');
  }
}