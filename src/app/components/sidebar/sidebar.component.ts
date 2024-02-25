import { Component, OnInit } from '@angular/core';
import { FeatureFlagDirective } from '../../shared/directives/feature-flag.directive';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.sass'],
    standalone: true,
    imports: [MatButton, RouterLink, MatIcon, FeatureFlagDirective]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
