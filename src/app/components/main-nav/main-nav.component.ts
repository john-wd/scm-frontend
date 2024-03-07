import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { FeatureFlagDirective } from '../../shared/directives/feature-flag.directive';
import { MatMenuTrigger, MatMenu, MatMenuContent, MatMenuItem } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { MatIconButton, MatButton } from '@angular/material/button';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  standalone: true,
  imports: [MatIconButton, RouterLinkActive, MatIcon, MatMenuTrigger, FeatureFlagDirective, MatButton, MatMenu, MatMenuContent, ThemeToggleComponent, MatMenuItem, RouterLink, LoadingComponent,
    SearchBarComponent,]
})
export class MainNavComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void { }

  onBack() {
    this._location.back()
  }

}
