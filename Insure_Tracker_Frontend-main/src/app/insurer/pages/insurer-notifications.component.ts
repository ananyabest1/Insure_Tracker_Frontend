import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trackByIndex, trackByIdentity } from '../../core/track-by';

@Component({
  selector: 'app-insurer-notifications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './insurer-notifications.component.html',
  styleUrls: ['./insurer-notifications.component.scss'],
})
export class InsurerNotificationsComponent {
  readonly trackByIndex = trackByIndex;
  readonly trackByIdentity = trackByIdentity;
  readonly items = signal([
    { title: 'Claim update', body: 'CL-2025-001 moved to Under Review.', time: '2h ago', unread: true },
    { title: 'Document received', body: 'We received your discharge summary.', time: '1d ago', unread: false },
    { title: 'Premium reminder', body: 'Your renewal is due in 14 days.', time: '3d ago', unread: false },
  ]);

  markAllRead(): void {
    this.items.update((rows) => rows.map((r) => ({ ...r, unread: false })));
  }
}
