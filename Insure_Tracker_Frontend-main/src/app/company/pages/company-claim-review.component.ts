import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';
@Component({
  selector: 'app-company-claim-review',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './company-claim-review.component.html',
  styleUrls: ['./company-claim-review.component.scss'],
})
export class CompanyClaimReviewComponent {
  private readonly route = inject(ActivatedRoute);
  readonly claims = inject(ClaimsService);
  readonly id = this.route.snapshot.paramMap.get('id') ?? 'CL-2025-010';
  readonly tab = signal<'Documents' | 'Medical' | 'Policy' | 'Billing'>('Documents');

  claim() {
    return this.claims.getCompanyClaim(this.id);
  }

  setTab(t: 'Documents' | 'Medical' | 'Policy' | 'Billing'): void {
    this.tab.set(t);
  }
}
