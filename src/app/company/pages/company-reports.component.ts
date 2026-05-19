import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-reports',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1 class="page-title">Reports</h1>
    <p class="page-sub">Analytics and exports (demo placeholder).</p>
    <div class="card" style="padding: 1rem">
      <p style="margin: 0">Connect charts / exports here.</p>
      <a class="btn btn-secondary" routerLink="/company/dashboard" style="margin-top: 0.75rem; display: inline-flex">Back</a>
    </div>
  `,
})
export class CompanyReportsComponent {}
