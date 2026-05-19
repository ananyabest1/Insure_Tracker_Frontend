import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-hospital-billing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './hospital-billing.component.html',
  styleUrls: ['./hospital-billing.component.scss'],
})
export class HospitalBillingComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({
    claimId: ['', Validators.required],
    patient: ['', Validators.required],
    treatment: ['', Validators.required],
    admission: ['', Validators.required],
    discharge: ['', Validators.required],
    room: ['', Validators.required],
    procedure: ['', Validators.required],
    medicine: ['', Validators.required],
    diagnostics: ['', Validators.required],
    totalEstimated: ['', Validators.required],
    notes: [''],
    items: this.fb.array([
      this.fb.group({ item: [''], qty: [1], amount: [0] }),
      this.fb.group({ item: [''], qty: [1], amount: [0] }),
      this.fb.group({ item: [''], qty: [1], amount: [0] }),
    ]),
  });

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.group({ item: [''], qty: [1], amount: [0] }));
  }

  removeItem(i: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(i);
    }
  }

  lineSubtotal(): number {
    let sum = 0;
    for (const ctrl of this.items.controls) {
      const v = ctrl.value as { qty?: number | string; amount?: number | string };
      sum += Number(v.amount ?? 0) * Number(v.qty ?? 0);
    }
    return sum;
  }

  mainCharges(): number {
    const keys = ['room', 'procedure', 'medicine', 'diagnostics'] as const;
    let sum = 0;
    for (const k of keys) {
      sum += Number(this.form.get(k)?.value || 0);
    }
    return sum;
  }

  totalPayable(): number {
    return this.lineSubtotal() + this.mainCharges();
  }
}
