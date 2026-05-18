import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insurer-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './insurer-profile.component.html',
})
export class InsurerProfileComponent {
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.nonNullable.group({
    name: ['Rahul Sharma'],
    email: ['rahul@example.com'],
    mobile: ['+91 98765 43210'],
    address: ['Bengaluru, India'],
  });

  save(): void {
    this.form.markAllAsTouched();
  }
}
