import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  emailOrTenDigitMobileValidator,
  hospitalLoginIdentifierValidator,
  strictAllowedEmailValidator,
} from '../core/auth.validators';

type Portal = 'insurer' | 'company' | 'hospital';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly portal = signal<Portal>('insurer');
  readonly showPassword = signal(false);

  readonly emailLabel = computed(() => {
    switch (this.portal()) {
      case 'company':
        return 'Company email';
      case 'hospital':
        return 'Hospital email / ID';
      default:
        return 'Email or mobile';
    }
  });

  readonly emailPlaceholder = computed(() => {
    switch (this.portal()) {
      case 'company':
        return 'you@gmail.com';
      case 'hospital':
        return 'Email or hospital ID';
      default:
        return 'Email or 10-digit mobile';
    }
  });

  readonly title = computed(() => {
    switch (this.portal()) {
      case 'company':
        return 'Company login';
      case 'hospital':
        return 'Hospital login';
      default:
        return 'Insurer login';
    }
  });

  readonly form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor() {
    this.refreshEmailValidators();
  }

  private refreshEmailValidators(): void {
    const c = this.form.controls.email;
    c.clearValidators();
    c.addValidators(Validators.required);
    switch (this.portal()) {
      case 'insurer':
        c.addValidators(emailOrTenDigitMobileValidator);
        break;
      case 'company':
        c.addValidators(strictAllowedEmailValidator);
        break;
      case 'hospital':
        c.addValidators(hospitalLoginIdentifierValidator);
        break;
    }
    c.updateValueAndValidity({ emitEvent: false });
  }

  setPortal(p: Portal): void {
    this.portal.set(p);
    this.refreshEmailValidators();
    this.form.controls.email.setErrors(null);
    this.form.controls.email.markAsUntouched();
  }

  onEmailInput(): void {
    if (this.portal() !== 'insurer') {
      return;
    }
    const raw = String(this.form.controls.email.value ?? '');
    if (raw.includes('@')) {
      return;
    }
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    if (digits !== raw) {
      this.form.controls.email.setValue(digits, { emitEvent: false });
    }
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const target =
      this.portal() === 'insurer'
        ? '/insurer/dashboard'
        : this.portal() === 'company'
          ? '/company/dashboard'
          : '/hospital/dashboard';
    this.router.navigateByUrl(target);
  }

  otp(): void {
    this.router.navigate(['/login-otp'], { queryParams: { portal: this.portal() } });
  }
}
