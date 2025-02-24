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
  private mobileBreakpoint = 1024; // Adjust this value as needed (1024px for lg breakpoint)

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMenuOpen = window.innerWidth > this.mobileBreakpoint;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}