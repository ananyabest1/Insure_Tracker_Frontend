import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';
import { trackByClaimId } from '../../core/track-by';

@Component({
  selector: 'app-insurer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './insurer-dashboard.component.html',
  styleUrls: ['./insurer-dashboard.component.scss'],
})
export class InsurerDashboardComponent {
  readonly trackByClaimId = trackByClaimId;
  readonly claims = inject(ClaimsService);
}
