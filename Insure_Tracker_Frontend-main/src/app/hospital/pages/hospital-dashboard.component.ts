import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-hospital-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hospital-dashboard.component.html',
  styleUrls: ['./hospital-dashboard.component.scss'],
})
export class HospitalDashboardComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  readonly claims = inject(ClaimsService);

  badge(status: string): string {
    if (status === 'Completed' || status === 'Approved') {
      return 'success';
    }
    if (status === 'Pending') {
      return 'warn';
    }
    return 'info';
  }
}
