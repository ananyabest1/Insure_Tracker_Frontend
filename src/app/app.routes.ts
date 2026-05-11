import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClaimReviewComponent } from './pages/claim-review/claim-review.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'notifications',
    component: NotificationsComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'claim-review',
    component: ClaimReviewComponent,
  },
];