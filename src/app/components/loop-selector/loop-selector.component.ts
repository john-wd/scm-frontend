import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Loop, LoopType, availableTypes } from 'src/app/models/scm.model';


@Component({
  selector: 'app-loop-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './loop-selector.component.html',
  styleUrl: './loop-selector.component.scss'
})
export class LoopSelectorComponent {
  @Input() loop?: Loop;
  @Output() loopChange = new EventEmitter<Loop>();

  @Input() enabledTypes: LoopType[] = availableTypes;
  @Input({ transform: booleanAttribute }) useChips: boolean;

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
