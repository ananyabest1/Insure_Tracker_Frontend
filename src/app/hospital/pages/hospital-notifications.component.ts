import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hospital-notifications',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hospital-notifications.component.html',
  styleUrl: './hospital-notifications.component.scss',
})
export class HospitalNotificationsComponent {
  readonly items = signal([
    { title: 'Pre-auth update', body: 'PA-2025-0814 is pending insurer review.', time: '10m ago', unread: true },
    { title: 'Document verified', body: 'DOC-2025-2241 marked complete.', time: '2h ago', unread: false },
  ]);

  markAll(): void {
    this.items.update((rows) => rows.map((r) => ({ ...r, unread: false })));
  }
}
