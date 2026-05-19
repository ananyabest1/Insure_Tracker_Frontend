import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hospital-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './hospital-shell.component.html',
  styleUrls: ['./hospital-shell.component.scss'],
})
export class HospitalShellComponent {}
