import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';

@Component({
  selector: 'app-hospital-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hospital-dashboard.component.html',
  styleUrl: './hospital-dashboard.component.scss',
})
export class HospitalDashboardComponent {
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
