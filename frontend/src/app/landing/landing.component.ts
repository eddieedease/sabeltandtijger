import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="min-h-screen bg-purple-100 flex flex-col">
      <main class="flex-grow container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-5xl font-bold text-purple-900 mb-4">Welcome to Our App</h1>
            <p class="text-xl text-purple-700 mb-6">Discover amazing features and boost your productivity!</p>
            <a [routerLink]="['/admin']" class="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700">
              Go to Admin
            </a>
          </div>
          <div class="md:w-1/2">
            <div class="bg-white rounded-lg p-6 shadow-lg">
              <h2 class="text-2xl font-bold mb-4">Featured Content</h2>
              <p class="mb-4">Here's some important information or a call to action for your users.</p>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class LandingComponent {
  // You can add any component logic here
}