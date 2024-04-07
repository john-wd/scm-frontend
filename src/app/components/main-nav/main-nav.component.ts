import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { FeatureFlagDirective } from 'src/app/shared/directives/feature-flag.directive';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FeatureFlagDirective,
    MatMenuModule,
    ThemeToggleComponent,
    LoadingComponent,
    SearchBarComponent,
  ]
})
export class MainNavComponent {

  constructor(
    private _location: Location,
  ) { }

  onBack() {
    this._location.back()
  }

}
