import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private darkMode: boolean
  private darkModeSubject = new Subject<boolean>()

  constructor() {
    this.darkMode = false;
    this.darkModeSubject.next(false);
  }

  isDarkMode(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }

  toggleMode() {
    this.darkMode = !this.darkMode
    this.darkModeSubject.next(this.darkMode)
    if (this.darkMode) {
      document.body.classList.add('theme--dark');
      document.body.classList.remove('theme--default');
    } else {
      document.body.classList.remove('theme--dark');
      document.body.classList.add('theme--default');
    }
  }
}
