import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-hospital-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hospital-notifications.component.html',
  styleUrls: ['./hospital-notifications.component.scss'],
})
export class HospitalNotificationsComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  readonly items = signal([
    { title: 'Pre-auth update', body: 'PA-2025-0814 is pending insurer review.', time: '10m ago', unread: true },
    { title: 'Document verified', body: 'DOC-2025-2241 marked complete.', time: '2h ago', unread: false },
  ]);

  markAll(): void {
    this.items.update((rows) => rows.map((r) => ({ ...r, unread: false })));
  }
}
