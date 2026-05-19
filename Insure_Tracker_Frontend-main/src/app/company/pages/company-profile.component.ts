import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './company-profile.component.html',
})
export class CompanyProfileComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  private readonly fb = inject(FormBuilder);
  readonly show = { c: false, n: false, cn: false };
  readonly company = this.fb.nonNullable.group({
    name: ['Acme Insurance Ltd.'],
    email: ['ops@acme-insurance.example'],
    mobile: ['+91 80 4000 0000'],
    address: ['Mumbai, India'],
  });

  readonly passwords = this.fb.nonNullable.group({
    current: [''],
    next: [''],
    confirm: [''],
  });

  toggle(which: 'c' | 'n' | 'cn'): void {
    this.show[which] = !this.show[which];
  }

  save(): void {
    this.company.markAllAsTouched();
  }
}
