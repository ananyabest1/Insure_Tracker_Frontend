import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-company-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './company-feedback.component.html',
})
export class CompanyFeedbackComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  private readonly fb = inject(FormBuilder);
  readonly stars = signal(0);
  readonly form = this.fb.nonNullable.group({
    feedback: ['', Validators.required],
    improve: ['', Validators.required],
  });

  setStars(n: number): void {
    this.stars.set(n);
  }

  submit(): void {
    this.form.markAllAsTouched();
  }
}
