import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'icloud.com',
  'zoho.com',
] as const;

const domainPattern = new RegExp(
  `^[a-zA-Z0-9._%+-]+@(${ALLOWED_EMAIL_DOMAINS.join('|').replace(/\./g, '\\.')})$`,
  'i',
);

export function allowedEmailDomainValidator(control: AbstractControl): ValidationErrors | null {
  const raw = (control.value ?? '').toString().trim();
  if (!raw) {
    return null;
  }
  if (!raw.includes('@')) {
    return { emailDomain: true };
  }
  if (!domainPattern.test(raw)) {
    return { emailDomain: true };
  }
  return null;
}

/** Exactly 10 digits (e.g. Indian mobile without country code). */
export function tenDigitMobileValidator(control: AbstractControl): ValidationErrors | null {
  const raw = (control.value ?? '').toString().trim().replace(/\s+/g, '');
  if (!raw) {
    return null;
  }
  if (!/^\d{10}$/.test(raw)) {
    return { mobileTen: true };
  }
  return null;
}

/** Login identifier: allowed email domain OR 10-digit mobile. */
export const emailOrTenDigitMobileValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const raw = (control.value ?? '').toString().trim().replace(/\s+/g, '');
  if (!raw) {
    return null;
  }
  if (raw.includes('@')) {
    return allowedEmailDomainValidator(control);
  }
  return tenDigitMobileValidator(control);
};

/** Company / recovery: strict allowed-domain email. */
export const strictAllowedEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const raw = (control.value ?? '').toString().trim();
  if (!raw) {
    return null;
  }
  return allowedEmailDomainValidator(control);
};

/** Hospital: allowed email OR alphanumeric id (no @). */
export const hospitalLoginIdentifierValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const raw = (control.value ?? '').toString().trim();
  if (!raw) {
    return null;
  }
  if (raw.includes('@')) {
    return allowedEmailDomainValidator(control);
  }
  if (/^\d{10}$/.test(raw)) {
    return null;
  }
  if (/^[a-zA-Z0-9._-]{3,64}$/.test(raw)) {
    return null;
  }
  return { hospitalId: true };
};

export const PASSWORD_RULES_TEXT = [
  'At least 8 characters',
  'One uppercase letter (A–Z)',
  'One lowercase letter (a–z)',
  'One number (0–9)',
  'One special character (!@#$%^&* etc.)',
] as const;

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const v = (control.value ?? '').toString();
  if (!v) {
    return null;
  }
  const errors: Record<string, true> = {};
  if (v.length < 8) {
    errors.minLen = true;
  }
  if (!/[A-Z]/.test(v)) {
    errors.upper = true;
  }
  if (!/[a-z]/.test(v)) {
    errors.lower = true;
  }
  if (!/\d/.test(v)) {
    errors.digit = true;
  }
  if (!/[^A-Za-z0-9]/.test(v)) {
    errors.special = true;
  }
  return Object.keys(errors).length ? { passwordStrength: errors } : null;
}

export function passwordsMatchGroupValidator(group: AbstractControl): ValidationErrors | null {
  const p = group.get('password')?.value;
  const c = group.get('confirm')?.value;
  if (!p || !c || p === c) {
    return null;
  }
  return { passwordMismatch: true };
}
