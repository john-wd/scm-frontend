import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { FeatureFlagDirective } from '../../shared/directives/feature-flag.directive';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  standalone: true,
  imports: [MatIconButton, RouterLinkActive, MatIcon, MatMenuTrigger, FeatureFlagDirective, MatButton, MatMenu, MatMenuContent, ThemeToggleComponent, MatMenuItem, RouterLink, LoadingComponent,
    SearchBarComponent,]
})
export class MainNavComponent {

  constructor(
    private _location: Location,
  ) { }

  onBack() {
    this._location.back()
  }

}
