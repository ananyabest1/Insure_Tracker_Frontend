import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';

@Component({
  selector: 'app-insurer-claim-track',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './insurer-claim-track.component.html',
  styleUrl: './insurer-claim-track.component.scss',
})
export class InsurerClaimTrackComponent {
  private readonly route = inject(ActivatedRoute);
  readonly claims = inject(ClaimsService);

  readonly id = this.route.snapshot.paramMap.get('id') ?? 'CL-2025-001';

  claim() {
    return this.claims.getInsurerClaim(this.id);
  }
}
