import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insurer-pre-auth',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './insurer-pre-auth.component.html',
})
export class InsurerPreAuthComponent {
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    emergencyType: this.fb.nonNullable.control<'Accident' | 'Critical' | 'Surgery' | 'Other'>('Accident'),
    hospital: ['', Validators.required],
    location: ['', Validators.required],
    patient: ['', Validators.required],
    policy: ['', Validators.required],
    description: ['', Validators.required],
    amount: ['', Validators.required],
  });

  submit(): void {
    this.form.markAllAsTouched();
  }
}
