import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, startWith } from 'rxjs';

const darkStyleName = 'darkMode'
const lightStyleName = 'lightMode'

function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => list.matches)
  );
}

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private darkMode: boolean;

  constructor() {
    this.darkMode = false;
    media('(prefers-color-scheme: dark)').subscribe(s => {
      s ? this.setDarkMode() : this.setLightMode()
    })
  }

  isDarkMode(): boolean {
    return this.darkMode
  }

  private setDarkMode() {
    document.body.classList.remove(lightStyleName);
    document.body.classList.add(darkStyleName);
    this.darkMode = true
  }

  private setLightMode() {
    document.body.classList.remove(darkStyleName);
    document.body.classList.add(lightStyleName);
    this.darkMode = false
  }

  toggleMode() {
    (this.darkMode) ? this.setLightMode() : this.setDarkMode();
  }
}
