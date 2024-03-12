import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

export type LoopType = "default" | "none" | "time" | "count"

export type Loop = {
  loopType: LoopType;
  value?: number;
}

@Component({
  selector: 'app-loop-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './loop-selector.component.html',
  styleUrl: './loop-selector.component.scss'
})
export class LoopSelectorComponent {
  @Output() loopChange = new EventEmitter<Loop>()
  @Input() enabledTypes: LoopType[];

  availableTypes: LoopType[] = [
    "default",
    "count",
    "time",
    "none"
  ]
  typeTooltips = {
    "default": "The default amount set in the player",
    "count": "Amount of times the song should loop",
    "time": "Loops for this amount of time",
    "none": "Only play the song once"
  }
  value: LoopType = "default";

  setLoopType(val: LoopType) {
    this.value = val
  }

  focusInput(el: HTMLElement) {
    let inp = el.querySelector("input")
    if (inp) {
      inp.focus()
      inp.select()
    }
  }
}
