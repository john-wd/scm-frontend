import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { FeatureFlagDirective } from './directives/feature-flag.directive';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ThemeToggleComponent,
    FeatureFlagDirective,
  ],
  exports: [
    ThemeToggleComponent,
    FeatureFlagDirective,
  ]
})
export class SharedModule { }
