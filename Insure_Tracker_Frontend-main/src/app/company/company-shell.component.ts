import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-company-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './company-shell.component.html',
  styleUrls: ['./company-shell.component.scss'],
})
export class CompanyShellComponent {}
