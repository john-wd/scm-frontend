import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export const Separator = "==="
export interface Action {
  icon: string,
  label: string,
  callbackFn: () => void
}

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    NgFor,
    MatIcon
  ],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.sass'
})
export class ContextMenuComponent {
  @Input('actions') actions: (Action | string)[]

  onclick(idx: number) {
    let act = this.actions[idx]
    if (this.isAction(act)) {
      act.callbackFn()
    }
  }

  isAction(act: Action | string): act is Action {
    return "label" in (act as Action)
  }

  isSeparator(act: Action | string): act is string {
    return act === Separator
  }
}
