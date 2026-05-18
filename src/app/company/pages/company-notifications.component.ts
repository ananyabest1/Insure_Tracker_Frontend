import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-notifications',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-notifications.component.html',
  styleUrl: './company-notifications.component.scss',
})
export class CompanyNotificationsComponent {
  readonly filter = signal<'All' | 'Claims' | 'Pre-Auth' | 'Complaints' | 'System'>('All');

  readonly items = signal([
    { cat: 'Claims' as const, title: 'Claim approved', body: 'CL-2025-010 approved.', time: '5m ago', unread: true },
    { cat: 'Pre-Auth' as const, title: 'Pre-auth received', body: 'PA-2025-014 needs review.', time: '20m ago', unread: true },
    { cat: 'System' as const, title: 'Maintenance window', body: 'Sunday 2:00–3:00 AM IST.', time: '1d ago', unread: false },
  ]);

  setFilter(v: 'All' | 'Claims' | 'Pre-Auth' | 'Complaints' | 'System'): void {
    this.filter.set(v);
  }

  markAll(): void {
    this.items.update((rows) => rows.map((r) => ({ ...r, unread: false })));
  }

  filtered() {
    const f = this.filter();
    const rows = this.items();
    if (f === 'All') {
      return rows;
    }
    return rows.filter((r) => r.cat === f);
  }
}
