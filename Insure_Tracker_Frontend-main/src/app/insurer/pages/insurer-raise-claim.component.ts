import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-insurer-raise-claim',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './insurer-raise-claim.component.html',
  styleUrls: ['./insurer-raise-claim.component.scss'],
})
export class InsurerRaiseClaimComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  private readonly fb = inject(FormBuilder);
  readonly step = signal(1);

  readonly form = this.fb.nonNullable.group({
    policy: ['', Validators.required],
    hospital: ['', Validators.required],
    patient: ['', Validators.required],
    amount: ['', Validators.required],
    admission: ['', Validators.required],
    discharge: ['', Validators.required],
    type: this.fb.nonNullable.control<'Cashless' | 'Reimbursement'>('Cashless'),
    note: [''],
  });

  next(): void {
    this.form.markAllAsTouched();
    if (this.step() === 1 && this.form.invalid) {
      return;
    }
    this.step.update((s) => Math.min(4, s + 1));
  }

  back(): void {
    this.step.update((s) => Math.max(1, s - 1));
  }

  submit(): void {
    this.step.set(4);
  }
}
