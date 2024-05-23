import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;
}
