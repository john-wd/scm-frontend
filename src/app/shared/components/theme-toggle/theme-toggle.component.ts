import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon, } from '@angular/material/icon';
import { MatMenuItem } from '@angular/material/menu';
import { ThemeToggleService } from '../../services/theme-toggle.service';

@Component({
  selector: 'theme-toggle-menu',
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatMenuItem,
  ],
  styleUrls: ['./theme-toggle.component.scss']
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
