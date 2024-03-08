import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FeatureFlagDirective } from '../../shared/directives/feature-flag.directive';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MatButton, RouterLink, MatIcon, FeatureFlagDirective]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
