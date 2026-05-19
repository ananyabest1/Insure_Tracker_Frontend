import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insurer-notifications',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './insurer-notifications.component.html',
  styleUrl: './insurer-notifications.component.scss',
})
export class InsurerNotificationsComponent {
  readonly items = signal([
    { title: 'Claim update', body: 'CL-2025-001 moved to Under Review.', time: '2h ago', unread: true },
    { title: 'Document received', body: 'We received your discharge summary.', time: '1d ago', unread: false },
    { title: 'Premium reminder', body: 'Your renewal is due in 14 days.', time: '3d ago', unread: false },
  ]);

  markAllRead(): void {
    this.items.update((rows) => rows.map((r) => ({ ...r, unread: false })));
  }
}
