import { Injectable, signal } from '@angular/core';

export type ClaimStatus = 'New' | 'Under Review' | 'Approved' | 'Settled' | 'Closed' | 'Rejected' | 'In Progress';

export interface InsurerClaim {
  id: string;
  hospital: string;
  patient: string;
  amount: string;
  status: ClaimStatus;
  date: string;
  steps: { label: string; done: boolean; active?: boolean }[];
}

export interface ActivityRow {
  claimId: string;
  time: string;
  status: string;
}

export interface CompanyClaimRow {
  id: string;
  date: string;
  hospital: string;
  patient: string;
  amount: string;
  status: ClaimStatus;
}

export interface HospitalActivity {
  date: string;
  type: string;
  ref: string;
  patient: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ClaimsService {
  readonly insurerClaims = signal<InsurerClaim[]>([
    {
      id: 'CL-2025-001',
      hospital: 'Apollo Hospital',
      patient: 'Rahul Sharma',
      amount: '₹ 2,45,000',
      status: 'Under Review',
      date: 'May 12, 2025',
      steps: [
        { label: 'Submitted', done: true },
        { label: 'Under Review', done: false, active: true },
        { label: 'Approved', done: false },
        { label: 'Settled', done: false },
      ],
    },
    {
      id: 'CL-2025-014',
      hospital: 'Fortis',
      patient: 'Neha Verma',
      amount: '₹ 98,500',
      status: 'Approved',
      date: 'May 10, 2025',
      steps: [
        { label: 'Submitted', done: true },
        { label: 'Under Review', done: true },
        { label: 'Approved', done: true, active: true },
        { label: 'Settled', done: false },
      ],
    },
    {
      id: 'CL-2025-021',
      hospital: 'Max Healthcare',
      patient: 'Anil Mehta',
      amount: '₹ 3,10,000',
      status: 'Settled',
      date: 'Apr 28, 2025',
      steps: [
        { label: 'Submitted', done: true },
        { label: 'Under Review', done: true },
        { label: 'Approved', done: true },
        { label: 'Settled', done: true, active: true },
      ],
    },
  ]);

  readonly insurerActivity = signal<ActivityRow[]>([
    { claimId: 'CL-2025-001', time: '2h ago', status: 'Under Review' },
    { claimId: 'CL-2025-014', time: '1d ago', status: 'Approved' },
    { claimId: 'CL-2025-021', time: '3d ago', status: 'Settled' },
  ]);

  readonly companyClaims = signal<CompanyClaimRow[]>([
    {
      id: 'CL-2025-010',
      date: 'May 16, 2025',
      hospital: 'Apollo Hospital',
      patient: 'Priya Sharma',
      amount: '₹ 1,85,000',
      status: 'Under Review',
    },
    {
      id: 'CL-2025-009',
      date: 'May 16, 2025',
      hospital: 'AIIMS',
      patient: 'Ravi Kumar',
      amount: '₹ 4,20,000',
      status: 'New',
    },
    {
      id: 'CL-2025-008',
      date: 'May 15, 2025',
      hospital: 'Fortis',
      patient: 'Suresh Patel',
      amount: '₹ 76,200',
      status: 'Rejected',
    },
  ]);

  readonly hospitalActivity = signal<HospitalActivity[]>([
    {
      date: 'May 16, 2025 10:35 AM',
      type: 'Pre-Auth',
      ref: 'PA-2025-0814',
      patient: 'Ravi Kumar',
      status: 'Pending',
    },
    {
      date: 'May 16, 2025 09:15 AM',
      type: 'Document Upload',
      ref: 'DOC-2025-2241',
      patient: 'Priya Sharma',
      status: 'Completed',
    },
    {
      date: 'May 15, 2025 04:40 PM',
      type: 'Billing Request',
      ref: 'BILL-2025-1190',
      patient: 'Anil Mehta',
      status: 'Under Review',
    },
    {
      date: 'May 15, 2025 11:20 AM',
      type: 'Pre-Auth',
      ref: 'PA-2025-0809',
      patient: 'Neha Verma',
      status: 'Approved',
    },
    {
      date: 'May 14, 2025 03:05 PM',
      type: 'Document Upload',
      ref: 'DOC-2025-2210',
      patient: 'Suresh Patel',
      status: 'Completed',
    },
  ]);

  getInsurerClaim(id: string): InsurerClaim | undefined {
    return this.insurerClaims().find((c) => c.id === id);
  }

  getCompanyClaim(id: string): CompanyClaimRow | undefined {
    return this.companyClaims().find((c) => c.id === id);
  }
}
