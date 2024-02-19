import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Action, ContextMenuService, Position } from '../../services/context-menu-service.service';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'context-menu-button',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './context-menu-button.component.html',
  styleUrl: './context-menu-button.component.sass'
})
export class ContextMenuButtonComponent {
  @Input('actions') actions: (Action | string)[]
  constructor(private menuService: ContextMenuService) { }

  openMenu(evt: MouseEvent) {
    let mousePos = {
      x: evt.clientX,
      y: evt.clientY,
    } as Position
    this.menuService.open(this.actions, mousePos)
  }
}
