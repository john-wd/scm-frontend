import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ContextMenuContainerComponent } from './components/context-menu-container/context-menu-container.component';
import { ContextMenuButtonComponent } from './components/context-menu-button/context-menu-button.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ContextMenuComponent,
    ContextMenuButtonComponent,
    ContextMenuContainerComponent,
  ],
  exports: [
    ContextMenuComponent,
    ContextMenuButtonComponent,
    ContextMenuContainerComponent,
  ]
})
export class SharedModule { }
