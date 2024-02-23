import { Injectable } from '@angular/core';

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
    this.darkMode = !this.darkMode
    if (this.darkMode) {
      document.body.classList.add('theme--dark');
      document.body.classList.remove('theme--default');
    } else {
      document.body.classList.remove('theme--dark');
      document.body.classList.add('theme--default');
    }
  }
}
