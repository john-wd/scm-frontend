import { NgFor } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Action, Position, Separator } from '../../services/context-menu-service.service';

@Component({
  selector: 'context-menu',
  standalone: true,
  imports: [
    NgFor,
    MatIcon,
    MatButton,
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.sass'
})
export class ContextMenuComponent {
  @Input('actions') actions: (Action | string)[]
  @Input('position') position: Position
  @Output() close = new EventEmitter()

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.onclose();
  }

  onclick(idx: number) {
    let act = this.actions[idx]
    if (this.isAction(act)) {
      act.callbackFn()
      this.onclose()
    }
  }

  onclose() {
    this.close.emit()
  }

  isAction(act: Action | string): act is Action {
    if (act instanceof Object) {
      return "label" in (act as Action)
    }
    return false
  }

  isSeparator(act: Action | string): act is string {
    return act === Separator
  }

  stylePosition() {
    return {
      "left": this.position.x.toString() + "px",
      "top": this.position.y.toString() + "px",
    }
  }
}
