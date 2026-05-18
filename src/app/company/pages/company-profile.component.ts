import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-profile.component.html',
})
export class CompanyProfileComponent {
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
