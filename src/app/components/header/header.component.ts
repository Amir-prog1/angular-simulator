import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  id: string;
  title: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  companyName: string = 'РУМТИБЕТ';

  navLinks: NavLink[] = [
    { id: 'home-nav-link', title: 'Главная', route: '/' },
    { id: 'users-nav-link', title: 'Пользователи', route: '/users' },
  ];

}