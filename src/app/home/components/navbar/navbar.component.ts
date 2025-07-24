// navbar.component.ts
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'home-navbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
}
