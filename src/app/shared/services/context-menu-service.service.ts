import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Position = {
  x: number,
  y: number,
}

export const Separator = "==="
export interface Action {
  icon: string,
  label: string,
  callbackFn: () => void
}

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private menuShown = new Subject<boolean>()
  menuShown$ = this.menuShown.asObservable()

  actions: (Action | string)[]
  position: Position

  constructor() {
    this.menuShown.next(false)
  }

  open(actions: (Action | string)[], position: Position) {
    this.actions = actions
    this.position = position
    this.menuShown.next(true)
  }

  close() {
    this.menuShown.next(false)
  }

}
