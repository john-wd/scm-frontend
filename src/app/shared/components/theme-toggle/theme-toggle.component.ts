import { Component, OnInit } from '@angular/core';
import { ThemeToggleService } from '../../services/theme-toggle.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon, } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuItem } from '@angular/material/menu';

@Component({
  selector: 'theme-toggle-menu',
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatMenuItem,
  ],
  styleUrls: ['./theme-toggle.component.sass']
})
export class ThemeToggleComponent implements OnInit {
  constructor(private themeService: ThemeToggleService) {
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode()
  }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.themeService.toggleMode();
  }

}
