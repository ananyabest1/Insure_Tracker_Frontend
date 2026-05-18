import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DocRow {
  name: string;
  type: string;
  uploaded: string;
}

@Component({
  selector: 'app-insurer-documents',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './insurer-documents.component.html',
})
export class InsurerDocumentsComponent {
  readonly rows = signal<DocRow[]>([
    { name: 'Discharge summary.pdf', type: 'Medical', uploaded: 'May 10, 2025' },
    { name: 'Final bill.pdf', type: 'Billing', uploaded: 'May 10, 2025' },
    { name: 'Investigation report.pdf', type: 'Diagnostics', uploaded: 'May 11, 2025' },
  ]);

  remove(i: number): void {
    this.rows.update((r) => r.filter((_, idx) => idx !== i));
  }
}
