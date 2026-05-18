import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClaimsService } from '../../core/claims.service';

@Component({
  selector: 'app-insurer-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './insurer-dashboard.component.html',
  styleUrl: './insurer-dashboard.component.scss',
})
export class InsurerDashboardComponent {
  readonly claims = inject(ClaimsService);
}
