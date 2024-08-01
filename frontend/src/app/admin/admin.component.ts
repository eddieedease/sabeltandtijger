import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminComponent implements OnInit {
  isMenuOpen = true;
  isMobile = false;
  private mobileBreakpoint = 768;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < this.mobileBreakpoint;
    if (!this.isMobile) {
      this.isMenuOpen = true;
    } else {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenuOnMobile() {
    if (this.isMobile) {
      this.isMenuOpen = false;
    }
  }
}