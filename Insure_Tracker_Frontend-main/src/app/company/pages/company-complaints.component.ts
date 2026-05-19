import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-company-complaints',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './company-complaints.component.html',
})
export class CompanyComplaintsComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  readonly filter = signal<'All' | 'New' | 'In Progress' | 'Resolved' | 'Closed'>('All');

  readonly rows = [
    { id: 'CP-2025-004', who: 'Rahul Sharma', subject: 'Delay in settlement', date: 'May 14', status: 'New' as const },
    { id: 'CP-2025-001', who: 'Neha Verma', subject: 'Incorrect deduction', date: 'May 02', status: 'Resolved' as const },
  ];

  setFilter(v: 'All' | 'New' | 'In Progress' | 'Resolved' | 'Closed'): void {
    this.filter.set(v);
  }
}
