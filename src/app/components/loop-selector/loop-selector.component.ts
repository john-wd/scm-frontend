import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

export type LoopType = "default" | "none" | "time" | "count"

export type Loop = {
  loopType: LoopType;
  value?: number;
}

const availableTypes: LoopType[] = [
  "default",
  "count",
  "time",
  "none"
]

let once = false;

@Component({
  selector: 'app-loop-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './loop-selector.component.html',
  styleUrl: './loop-selector.component.scss'
})
export class LoopSelectorComponent {
  @Input() loop: Loop;
  @Output() loopChange = new EventEmitter<Loop>();

  @Input() enabledTypes: LoopType[] = availableTypes;

  selectedType: LoopType = "default";
  selectedValue: string;

  set setloop(l: Loop) {
    this.loop = l
    this.loopChange.emit(this.loop)
  }

  setLoopType(val: LoopType) {
    this.selectedType = val
    this.setloop = {
      loopType: val,
    }
  }

  inputChange() {
    let value: number;
    if (this.selectedType === "time" as LoopType) {
      let splits = this.selectedValue.split(":")
      value = (Number(splits[0]) * 60 + Number(splits[1])) * 1e3
    } else {
      value = Number(this.selectedValue)
    }

    this.setloop = {
      loopType: this.selectedType,
      value: value
    }
  }

  focusInput(el: HTMLElement) {
    let inp = el.querySelector("input")
    if (inp) {
      inp.focus()
      inp.select()
    }
  }
}
