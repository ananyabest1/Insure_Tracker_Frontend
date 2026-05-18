import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  emailOrTenDigitMobileValidator,
  hospitalLoginIdentifierValidator,
  strictAllowedEmailValidator,
} from '../core/auth.validators';

type Portal = 'insurer' | 'company' | 'hospital';

@Component({
  selector: 'app-login-otp',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-otp.component.html',
  styleUrl: './login-otp.component.scss',
})
export class LoginOtpComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly portal = signal<Portal>('insurer');
  readonly otpSent = signal(false);

  readonly form = this.fb.nonNullable.group({
    identifier: ['', Validators.required],
    otp: [''],
  });

  constructor() {
    const p = this.route.snapshot.queryParamMap.get('portal');
    if (p === 'insurer' || p === 'company' || p === 'hospital') {
      this.portal.set(p);
    }
    this.applyIdentifierValidators();
    this.form.controls.otp.clearValidators();
    this.form.controls.otp.updateValueAndValidity({ emitEvent: false });
  }

  private applyIdentifierValidators(): void {
    const c = this.form.controls.identifier;
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

  readonly title = () => {
    switch (this.portal()) {
      case 'company':
        return 'OTP login · Company';
      case 'hospital':
        return 'OTP login · Hospital';
      default:
        return 'OTP login · Insurer';
    }
  };

  onIdentifierInput(): void {
    if (this.portal() !== 'insurer') {
      return;
    }
    const raw = this.form.controls.identifier.value ?? '';
    if (raw.includes('@')) {
      return;
    }
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    if (digits !== raw) {
      this.form.controls.identifier.setValue(digits, { emitEvent: false });
    }
  }

  sendOtp(): void {
    this.form.controls.identifier.markAsTouched();
    if (this.form.controls.identifier.invalid) {
      return;
    }
    this.form.controls.otp.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]);
    this.form.controls.otp.updateValueAndValidity({ emitEvent: false });
    this.otpSent.set(true);
  }

  verify(): void {
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
}
