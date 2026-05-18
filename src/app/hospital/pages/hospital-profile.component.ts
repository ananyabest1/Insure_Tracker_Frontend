import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hospital-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './hospital-profile.component.html',
})
export class HospitalProfileComponent {
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    name: ['Apollo Hospital'],
    email: ['billing@apollo.example'],
    phone: ['+91 80 1234 5678'],
    address: ['Bannerghatta Road, Bengaluru'],
  });

  save(): void {
    this.form.markAllAsTouched();
  }
}
