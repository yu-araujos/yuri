import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit, OnDestroy {
  letters: string[] = 'Yuri Silva'.split('').map(letter => letter === ' ' ? '\u00A0\u00A0\u00A0' : letter);
  animate: boolean = true;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startAnimationCycle();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAnimationCycle() {
    this.intervalId = setInterval(() => {
      this.animate = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.animate = true;
        this.cdr.detectChanges();
      }, 300);
    }, 7000);
  }
}