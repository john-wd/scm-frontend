import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/scm.model';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit {
  toggled = false;
  paused = true;
  playing: Song;
  timeElapsed: number; // in milliseconds
  timeTotal: number; // in milliseconds

  constructor(private playerService: PlayerService) {
    this.timeElapsed = 0 * 1e3;
    this.timeTotal = 125 * 1e3;
    setInterval(() => {
      if (this.paused) return;
      if (this.timeElapsed > this.timeTotal) {
        this.paused = true;
        return;
      }
      this.timeElapsed += 1e3;
    }, 1e3);
  }

  onToggle() {
    this.toggled = !this.toggled;
  }

  onClose() {
    this.toggled = false;
  }

  percElapsed(): number {
    if (!this.timeTotal) return 0;
    return (100 * this.timeElapsed) / this.timeTotal;
  }

  playPause() {
    this.paused = !this.paused;
    this.playing = {
      song_id: 123,
      name: 'test',
      game_name: 'Game',
      uploader: 'me',
    } as Song;
  }
  seek($event: any) {
    let percentage = $event.layerX / ($event.target.offsetWidth - 3);

    if (percentage > 1) {
      percentage = 1;
    } else if (percentage < 0) {
      percentage = 0;
    }
    this.timeElapsed = percentage * this.timeTotal;
  }
  stop() {}
  next() {}
  previous() {}

  ngOnInit(): void {}
}
