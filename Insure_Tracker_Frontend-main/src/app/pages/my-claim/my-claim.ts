// my-claim.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-claim',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-claim.component.html',
  styleUrls: ['./my-claim.component.scss']
})
export class MyClaimComponent {

  timeline = [
    {
      title: 'Claim Raised',
      desc: 'By Rahul Sharma (Insurer)',
      time: '28 Apr 2025, 10:14 AM',
      status: 'completed'
    },
    {
      title: 'Insurance Company Notified',
      desc: 'Star Health Insurance — email + portal',
      time: '28 Apr 2025, 10:15 AM',
      status: 'completed'
    },
    {
      title: 'Hospital Notified',
      desc: 'Apollo Hospital — email + portal',
      time: '28 Apr 2025, 10:17 AM',
      status: 'completed'
    },
    {
      title: 'Insurance Co. Acknowledged',
      desc: 'Star Health Insurance confirmed receipt',
      time: '28 Apr 2025, 11:30 AM',
      status: 'completed'
    },
    {
      title: 'Documents Verified',
      desc: 'Star Health Insurance — Priya Mehta',
      time: '29 Apr 2025, 02:30 PM',
      status: 'completed'
    },
    {
      title: 'Claim Under Review',
      desc: 'Star Health Insurance',
      time: '30 Apr 2025, 09:00 AM',
      status: 'current'
    },
    {
      title: 'Approval / Settlement Decision',
      desc: 'Pending from Star Health Insurance',
      time: 'Expected: 3 May 2025',
      status: 'pending'
    },
    {
      title: 'Amount Disbursed to Hospital',
      desc: 'Direct transfer to Apollo Hospital',
      time: 'Pending',
      status: 'pending'
    }
  ];

}