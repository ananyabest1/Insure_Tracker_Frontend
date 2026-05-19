import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  allowedEmailDomainValidator,
  getPasswordRuleStatus,
  passwordsMatchGroupValidator,
  strongPasswordValidator,
} from '../core/auth.validators';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly showRules = signal(false);
  readonly showPw = signal(false);
  readonly showPw2 = signal(false);

  readonly form = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, allowedEmailDomainValidator]],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirm: ['', Validators.required],
    },
    { validators: passwordsMatchGroupValidator },
  );

  readonly ruleStatus = computed(() => getPasswordRuleStatus(this.form.controls.password.value));

  onPasswordFocus(): void {
    this.showRules.set(true);
  }

  onPasswordInput(): void {
    this.showRules.set(true);
  }

  onPasswordBlur(): void {
    if (!this.form.controls.password.value) {
      this.showRules.set(false);
    }
  }

  togglePw(): void {
    this.showPw.update((v) => !v);
  }

  togglePw2(): void {
    this.showPw2.update((v) => !v);
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.router.navigateByUrl('/login');
  }
}
