import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { FeatureFlagDirective } from './directives/feature-flag.directive';
import { EntrycardComponent } from './components/entrycard/entrycard.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ThemeToggleComponent,
    FeatureFlagDirective,
    EntrycardComponent,
  ],
  exports: [
    ThemeToggleComponent,
    FeatureFlagDirective,
    EntrycardComponent,
  ]
})
export class SharedModule { }
