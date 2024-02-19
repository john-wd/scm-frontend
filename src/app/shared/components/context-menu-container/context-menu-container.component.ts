import { Component } from '@angular/core';
import { Action, ContextMenuService, Position } from '../../services/context-menu-service.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { ContextMenuComponent } from '../context-menu/context-menu.component';

@Component({
  selector: 'context-menu-container',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ContextMenuComponent,
  ],
  templateUrl: './context-menu-container.component.html',
  styleUrl: './context-menu-container.component.sass'
})
export class ContextMenuContainerComponent {
  menuShown$: Observable<boolean>

  constructor(private menuService: ContextMenuService) {
    this.menuShown$ = menuService.menuShown$
  }

  close() {
    this.menuService.close()
  }

  get actions(): (Action | string)[] {
    return this.menuService.actions
  }

  get position(): Position {
    return this.menuService.position
  }
}
