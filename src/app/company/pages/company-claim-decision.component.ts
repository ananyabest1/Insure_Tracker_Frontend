import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-claim-decision',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-claim-decision.component.html',
})
export class CompanyClaimDecisionComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  readonly id = this.route.snapshot.paramMap.get('id') ?? 'CL-2025-010';

  readonly form = this.fb.nonNullable.group({
    decision: this.fb.nonNullable.control<'Approve' | 'Reject'>('Approve'),
    approvedAmount: ['185000', Validators.required],
    remarks: [''],
  });

  saveDraft(): void {
    this.router.navigateByUrl('/company/claims');
  }

  finalize(): void {
    this.form.markAllAsTouched();
    this.router.navigateByUrl('/company/claims');
  }
}
