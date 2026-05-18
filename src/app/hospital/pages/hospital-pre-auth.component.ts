import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hospital-pre-auth',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './hospital-pre-auth.component.html',
})
export class HospitalPreAuthComponent {
  private readonly fb = inject(FormBuilder);
  readonly history = signal([
    { id: 'PR-2024-000123', patient: 'John Doe', date: '08 May 2024', status: 'Pending' as const },
    { id: 'PR-2024-000122', patient: 'Jane Smith', date: '06 May 2024', status: 'Approved' as const },
    { id: 'PR-2024-000121', patient: 'Robert Brown', date: '03 May 2024', status: 'Rejected' as const },
  ]);

  readonly form = this.fb.nonNullable.group({
    requestType: ['', Validators.required],
    claimId: ['', Validators.required],
    patient: ['', Validators.required],
    insurer: ['', Validators.required],
    policy: ['', Validators.required],
    treatment: ['', Validators.required],
    estAmount: ['', Validators.required],
    reqDate: ['', Validators.required],
    priority: ['', Validators.required],
    description: ['', Validators.required],
  });

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.history.update((h) => [
      {
        id: `PR-2026-${String(900 + h.length).padStart(3, '0')}`,
        patient: this.form.controls.patient.value,
        date: 'Just now',
        status: 'Pending',
      },
      ...h,
    ]);
  }
}
