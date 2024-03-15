import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { PlayerComponent } from './components/player/player.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeToggleService } from './shared/services/theme-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SidebarComponent, MainNavComponent, RouterOutlet, PlayerComponent]
})
export class AppComponent {
  title = 'smash-custom-music'

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly _: ThemeToggleService
  ) {
    matIconRegistry.addSvgIcon('repeat_time', domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/repeat_time.svg'))
    matIconRegistry.addSvgIcon('repeat_n', domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/repeat_n.svg'))
  }
}
