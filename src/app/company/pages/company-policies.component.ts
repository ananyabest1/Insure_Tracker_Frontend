import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-policies',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1 class="page-title">Policies</h1>
    <p class="page-sub">This screen is referenced in the company sidebar wireframe (demo placeholder).</p>
    <div class="card" style="padding: 1rem">
      <p style="margin: 0">Hook your policy administration module here.</p>
      <a class="btn btn-secondary" routerLink="/company/dashboard" style="margin-top: 0.75rem; display: inline-flex">Back</a>
    </div>
  `,
})
export class CompanyPoliciesComponent {}
