import { Component, OnInit } from '@angular/core';
import { ThemeToggleService } from './theme-toggle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.sass']
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode$: Observable<boolean>

  constructor(private themeService: ThemeToggleService) {
    this.isDarkMode$ = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.themeService.toggleMode();
  }

}
