import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  repeatedWords: string[] = Array(10).fill('About  Me')
  scrollPosition: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.scrollPosition = scrollTop * -0.9;
  }
}
