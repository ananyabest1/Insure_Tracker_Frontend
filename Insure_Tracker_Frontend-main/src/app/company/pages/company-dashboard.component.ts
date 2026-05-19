import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss'],
})
export class CompanyDashboardComponent {}
