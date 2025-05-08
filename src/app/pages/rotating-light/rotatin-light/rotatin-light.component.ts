import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-rotatin-light',
  imports: [MatButtonModule],
  templateUrl: './rotatin-light.component.html',
  standalone: true,
  styleUrl: './rotatin-light.component.css'
})
export class RotatinLightComponent implements AfterViewInit, OnDestroy{

  @ViewChild('checkyBorder') checkyBorder!: ElementRef<HTMLDivElement>;
  @ViewChild('checkyInput') checkyInput!: ElementRef<HTMLInputElement>;

  isChecked = true;
  private angle = 0;
  private animationFrameId?: number;
  private isAnimating = false;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    // Start animation only after view initialization
    if (this.isChecked) {
      this.startAnimation();
    }
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  toggleAnimation(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;

    if (this.isChecked) {
      this.startAnimation();
    } else {
      this.stopAnimation();
      this.checkyBorder.nativeElement.style.removeProperty('--angle');
    }
  }

  private startAnimation() {
    if (this.isAnimating || !this.checkyBorder) return;

    this.isAnimating = true;
    const animate = () => {
      if (!this.isAnimating) return;

      this.angle = (this.angle + 1) % 360;
      this.checkyBorder.nativeElement.style.setProperty('--angle', `${this.angle}deg`);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  private stopAnimation() {
    this.isAnimating = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  ngOnDestroy() {
    this.stopAnimation();
  }
}
