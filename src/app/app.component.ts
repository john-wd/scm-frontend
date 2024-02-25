import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
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
