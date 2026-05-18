import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password.component').then((m) => m.ForgotPasswordComponent),
  },
  {
    path: 'login-otp',
    loadComponent: () => import('./auth/login-otp.component').then((m) => m.LoginOtpComponent),
  },
  {
    path: 'insurer',
    loadComponent: () => import('./insurer/insurer-shell.component').then((m) => m.InsurerShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./insurer/pages/insurer-dashboard.component').then((m) => m.InsurerDashboardComponent),
      },
      {
        path: 'claims',
        loadComponent: () => import('./insurer/pages/insurer-claims-list.component').then((m) => m.InsurerClaimsListComponent),
      },
      {
        path: 'claims/track/:id',
        loadComponent: () => import('./insurer/pages/insurer-claim-track.component').then((m) => m.InsurerClaimTrackComponent),
      },
      {
        path: 'claims/raise',
        loadComponent: () => import('./insurer/pages/insurer-raise-claim.component').then((m) => m.InsurerRaiseClaimComponent),
      },
      {
        path: 'pre-auth',
        loadComponent: () => import('./insurer/pages/insurer-pre-auth.component').then((m) => m.InsurerPreAuthComponent),
      },
      {
        path: 'health-score',
        loadComponent: () => import('./insurer/pages/insurer-health-score.component').then((m) => m.InsurerHealthScoreComponent),
      },
      {
        path: 'documents',
        loadComponent: () => import('./insurer/pages/insurer-documents.component').then((m) => m.InsurerDocumentsComponent),
      },
      {
        path: 'ratings',
        loadComponent: () => import('./insurer/pages/insurer-ratings.component').then((m) => m.InsurerRatingsComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./insurer/pages/insurer-profile.component').then((m) => m.InsurerProfileComponent),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./insurer/pages/insurer-notifications.component').then((m) => m.InsurerNotificationsComponent),
      },
    ],
  },
  {
    path: 'company',
    loadComponent: () => import('./company/company-shell.component').then((m) => m.CompanyShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./company/pages/company-dashboard.component').then((m) => m.CompanyDashboardComponent),
      },
      {
        path: 'claims',
        loadComponent: () => import('./company/pages/company-incoming-claims.component').then((m) => m.CompanyIncomingClaimsComponent),
      },
      {
        path: 'claims/review/:id',
        loadComponent: () => import('./company/pages/company-claim-review.component').then((m) => m.CompanyClaimReviewComponent),
      },
      {
        path: 'claims/decision/:id',
        loadComponent: () => import('./company/pages/company-claim-decision.component').then((m) => m.CompanyClaimDecisionComponent),
      },
      {
        path: 'pre-auth',
        loadComponent: () => import('./company/pages/company-pre-auth.component').then((m) => m.CompanyPreAuthComponent),
      },
      {
        path: 'complaints',
        loadComponent: () => import('./company/pages/company-complaints.component').then((m) => m.CompanyComplaintsComponent),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./company/pages/company-notifications.component').then((m) => m.CompanyNotificationsComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./company/pages/company-profile.component').then((m) => m.CompanyProfileComponent),
      },
      {
        path: 'feedback',
        loadComponent: () => import('./company/pages/company-feedback.component').then((m) => m.CompanyFeedbackComponent),
      },
      {
        path: 'policies',
        loadComponent: () => import('./company/pages/company-policies.component').then((m) => m.CompanyPoliciesComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./company/pages/company-reports.component').then((m) => m.CompanyReportsComponent),
      },
    ],
  },
  {
    path: 'hospital',
    loadComponent: () => import('./hospital/hospital-shell.component').then((m) => m.HospitalShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./hospital/pages/hospital-dashboard.component').then((m) => m.HospitalDashboardComponent),
      },
      {
        path: 'documents',
        loadComponent: () => import('./hospital/pages/hospital-document-upload.component').then((m) => m.HospitalDocumentUploadComponent),
      },
      {
        path: 'billing',
        loadComponent: () => import('./hospital/pages/hospital-billing.component').then((m) => m.HospitalBillingComponent),
      },
      {
        path: 'pre-auth',
        loadComponent: () => import('./hospital/pages/hospital-pre-auth.component').then((m) => m.HospitalPreAuthComponent),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./hospital/pages/hospital-notifications.component').then((m) => m.HospitalNotificationsComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./hospital/pages/hospital-profile.component').then((m) => m.HospitalProfileComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
