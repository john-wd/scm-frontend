import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
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

const storageKey = "darkmode"

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private darkMode: boolean;

  constructor(
    private storage: StorageMap,
  ) {
    this.loadFromStorage()
    media('(prefers-color-scheme: dark)').subscribe(s => {
      s ? this.setDarkMode() : this.setLightMode()
    })
  }

  private loadFromStorage() {
    this.storage.get(storageKey).subscribe(b => {
      (b as boolean) ? this.setDarkMode() : this.setLightMode()
    })
  }

  private saveToStorage() {
    this.storage.set(storageKey, this.darkMode).subscribe(() => { })
  }

  isDarkMode(): boolean {
    return this.darkMode
  }

  private setDarkMode() {
    document.body.classList.remove(lightStyleName);
    document.body.classList.add(darkStyleName);
    this.darkMode = true
    this.saveToStorage()
  }

  private setLightMode() {
    document.body.classList.remove(darkStyleName);
    document.body.classList.add(lightStyleName);
    this.darkMode = false
    this.saveToStorage()
  }

  toggleMode() {
    (this.darkMode) ? this.setLightMode() : this.setDarkMode();
  }
}
