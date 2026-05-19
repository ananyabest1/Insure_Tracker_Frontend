import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  allowedEmailDomainValidator,
  passwordsMatchGroupValidator,
  strongPasswordValidator,
} from '../core/auth.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  readonly showPw = signal(false);
  readonly showPw2 = signal(false);

  readonly form = this.fb.nonNullable.group(
    {
      fullName: ['', Validators.required],
      email: ['', [Validators.required, allowedEmailDomainValidator]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(10)]],
      dob: ['', Validators.required],
      aadhaar: ['', Validators.required],
      pan: ['', Validators.required],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirm: ['', Validators.required],
      agree: [false, Validators.requiredTrue],
    },
    { validators: passwordsMatchGroupValidator },
  );

  toggle(which: 'p1' | 'p2'): void {
    if (which === 'p1') {
      this.showPw.update((v) => !v);
    } else {
      this.showPw2.update((v) => !v);
    }
  }

  onMobileInput(): void {
    const raw = String(this.form.controls.mobile.value ?? '');
    const digits = raw.replace(/\D/g, '').slice(0, 10);
    if (digits !== raw) {
      this.form.controls.mobile.setValue(digits, { emitEvent: false });
    }
  }

  submit(): void {
    this.form.markAllAsTouched();
  }
}
