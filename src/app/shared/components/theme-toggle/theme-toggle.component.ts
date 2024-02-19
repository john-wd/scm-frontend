import { Component, OnInit } from '@angular/core';
import { ThemeToggleService } from '../../services/theme-toggle.service';
import { Observable } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatIcon,
  ],
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
