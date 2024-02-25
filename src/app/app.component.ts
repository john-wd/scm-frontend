import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PlayerComponent } from './smashcustommusic/components/player/player.component';
import { RouterOutlet } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: true,
    imports: [SidebarComponent, MainNavComponent, RouterOutlet, PlayerComponent]
})
export class AppComponent {
  title = 'smash-custom-music';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    matIconRegistry.addSvgIcon("repeat_time", domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/repeat_time.svg"))
    matIconRegistry.addSvgIcon("repeat_n", domSanitizer.bypassSecurityTrustResourceUrl("/assets/icons/repeat_n.svg"))
  }
}
