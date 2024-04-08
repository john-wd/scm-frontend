import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-volume',
  standalone: true,
  imports: [
    CommonModule,
    MatIconButton,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
  ],
  templateUrl: './volume.component.html',
  styleUrl: './volume.component.scss'
})
export class VolumeComponent {
  @Input() isHidden: boolean = false;

  step = 0.01;

  // number from 0 to 1
  muted: boolean;

  private lastValue: number;

  get current(): number {
    return this.playerService.volume
  }

  set current(val: number) {
    this.muted = false
    this.playerService.setVolume(val)
  }

  constructor(
    private playerService: PlayerService,
  ) { }

  toggleMute() {
    if (this.muted) {
      this.playerService.setVolume(this.lastValue)
      this.muted = false
    } else {
      this.lastValue = this.current
      this.playerService.setVolume(0)
      this.muted = true
    }
  }
}
