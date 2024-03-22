import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { Subscription, map } from 'rxjs';
import { PlayerService, PlayerState } from 'src/app/services/player.service';

@Component({
  selector: 'app-volume',
  standalone: true,
  imports: [
    CommonModule,
    MatIconButton,
    MatIconModule,
    MatMenuModule,
    MatSlider,
    MatSliderThumb
  ],
  templateUrl: './volume.component.html',
  styleUrl: './volume.component.scss'
})
export class VolumeComponent {
  @Input() isHidden: boolean = false;

  step = 0.1;

  // number from 0 to 1
  _current: number = 1;
  muted: boolean;

  get current(): number {
    return this._current
  }

  set current(val: number) {
    this._current = val
  }

  private subscriptions: Subscription[] = []

  constructor(
    private playerService: PlayerService,
  ) {
    this.subscriptions.push(
      playerService.state$.pipe(map((state: PlayerState) => {
        this._current = state.volume
      })).subscribe()
    )
  }

  toggleMute() {
    this.muted = !this.muted
  }

  setVolume(val: string) {
    let value = Number(val)
  }
}
