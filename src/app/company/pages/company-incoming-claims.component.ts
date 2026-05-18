import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';
import type { ClaimStatus } from '../../core/claims.service';

@Component({
  selector: 'app-company-incoming-claims',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-incoming-claims.component.html',
})
export class CompanyIncomingClaimsComponent {
  readonly claims = inject(ClaimsService);
  readonly filter = signal<'All' | ClaimStatus>('All');

  setFilter(v: 'All' | ClaimStatus): void {
    this.filter.set(v);
  }

  filtered() {
    const f = this.filter();
    const rows = this.claims.companyClaims();
    if (f === 'All') {
      return rows;
    }
    return rows.filter((c) => c.status === f);
  }

  badge(status: string): string {
    if (status === 'New') {
      return 'info';
    }
    if (status === 'Under Review') {
      return 'warn';
    }
    if (status === 'Approved') {
      return 'success';
    }
    if (status === 'Rejected') {
      return 'neutral';
    }
    return 'neutral';
  }
}
