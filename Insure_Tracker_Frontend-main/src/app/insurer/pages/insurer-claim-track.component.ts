import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-insurer-claim-track',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './insurer-claim-track.component.html',
  styleUrls: ['./insurer-claim-track.component.scss'],
})
export class InsurerClaimTrackComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  private readonly route = inject(ActivatedRoute);
  readonly claims = inject(ClaimsService);

  readonly id = this.route.snapshot.paramMap.get('id') ?? 'CL-2025-001';

  claim() {
    return this.claims.getInsurerClaim(this.id);
  }
}
