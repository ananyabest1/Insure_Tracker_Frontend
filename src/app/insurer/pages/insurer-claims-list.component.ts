import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';
import type { ClaimStatus } from '../../core/claims.service';

@Component({
  selector: 'app-insurer-claims-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './insurer-claims-list.component.html',
  styleUrl: './insurer-claims-list.component.scss',
})
export class InsurerClaimsListComponent {
  readonly claims = inject(ClaimsService);
  readonly filter = signal<'All' | ClaimStatus>('All');

  setFilter(v: 'All' | ClaimStatus): void {
    this.filter.set(v);
  }

  filtered() {
    const f = this.filter();
    const rows = this.claims.insurerClaims();
    if (f === 'All') {
      return rows;
    }
    return rows.filter((c) => c.status === f);
  }

  badgeClass(status: string): string {
    if (status === 'Approved' || status === 'Settled') {
      return 'success';
    }
    if (status === 'Under Review' || status === 'In Progress') {
      return 'info';
    }
    if (status === 'Rejected' || status === 'Closed') {
      return 'neutral';
    }
    return 'warn';
  }
}
