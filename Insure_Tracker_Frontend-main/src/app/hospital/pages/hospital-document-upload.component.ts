import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

interface UploadedDoc {
  name: string;
  type: string;
  on: string;
}

@Component({
  selector: 'app-hospital-document-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './hospital-document-upload.component.html',
})
export class HospitalDocumentUploadComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  private readonly fb = inject(FormBuilder);
  readonly rows = signal<UploadedDoc[]>([
    { name: 'Lab_Report_2024-05-10.pdf', type: 'Lab report', on: 'May 10, 2024 10:30 AM' },
    { name: 'Prescription_May09.pdf', type: 'Prescription', on: 'May 09, 2024 04:15 PM' },
    { name: 'Radiology_Images.zip', type: 'Imaging', on: 'May 08, 2024 11:05 AM' },
  ]);

  readonly form = this.fb.nonNullable.group({
    claimId: ['', Validators.required],
    patient: ['', Validators.required],
    docType: ['', Validators.required],
    title: ['', Validators.required],
    serviceDate: ['', Validators.required],
    notes: [''],
  });

  remove(i: number): void {
    this.rows.update((r) => r.filter((_, idx) => idx !== i));
  }

  upload(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.rows.update((r) => [
      {
        name: `${this.form.controls.title.value}.pdf`,
        type: this.form.controls.docType.value,
        on: 'Just now',
      },
      ...r,
    ]);
  }
}
