import { Injectable } from '@angular/core';

const darkStyleName = 'darkMode'
@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private darkMode: boolean

  constructor() {
    this.darkMode = false;
  }

  isDarkMode(): boolean {
    return this.darkMode
  }

  toggleMode() {
    if (this.darkMode) {
      document.body.classList.remove(darkStyleName);
    } else {
      document.body.classList.add(darkStyleName);
    }
    this.darkMode = !this.darkMode
  }
}
