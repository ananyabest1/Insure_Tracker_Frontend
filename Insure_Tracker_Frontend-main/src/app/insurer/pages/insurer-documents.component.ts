import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

interface DocRow {
  name: string;
  type: string;
  uploaded: string;
}

@Component({
  selector: 'app-insurer-documents',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './insurer-documents.component.html',
})
export class InsurerDocumentsComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  readonly rows = signal<DocRow[]>([
    { name: 'Discharge summary.pdf', type: 'Medical', uploaded: 'May 10, 2025' },
    { name: 'Final bill.pdf', type: 'Billing', uploaded: 'May 10, 2025' },
    { name: 'Investigation report.pdf', type: 'Diagnostics', uploaded: 'May 11, 2025' },
  ]);

  remove(i: number): void {
    this.rows.update((r) => r.filter((_, idx) => idx !== i));
  }
}
