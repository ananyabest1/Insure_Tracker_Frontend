import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-feedback',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-feedback.component.html',
})
export class CompanyFeedbackComponent {
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
