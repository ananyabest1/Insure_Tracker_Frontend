import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-insurer-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './insurer-shell.component.html',
  styleUrl: './insurer-shell.component.scss',
})
export class InsurerShellComponent {}
