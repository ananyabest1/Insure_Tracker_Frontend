import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type PreFilter = 'All' | 'New' | 'Under Review' | 'Approved' | 'Rejected';

@Component({
  selector: 'app-company-pre-auth',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-pre-auth.component.html',
})
export class CompanyPreAuthComponent {
  readonly filter = signal<PreFilter>('All');

  readonly rows = [
    { id: 'PA-2025-014', date: 'May 16, 2025', hospital: 'Apollo', patient: 'Ravi Kumar', on: 'May 16', status: 'New' as const },
    { id: 'PA-2025-013', date: 'May 15, 2025', hospital: 'Fortis', patient: 'Neha', on: 'May 15', status: 'Approved' as const },
  ];

  setFilter(v: PreFilter): void {
    this.filter.set(v);
  }
}
