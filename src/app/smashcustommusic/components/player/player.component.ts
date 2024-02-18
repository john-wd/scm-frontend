import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../models/scm.model';
import { PlayerService } from '../../services/player.service';
import { Action, Position, Separator } from '../context-menu/context-menu.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit {
  toggled = false;
  hoverIdx = -1;
  private subscriptions: Subscription[] = [];

  isPlaying: boolean;
  playing: Song;
  playlist: Song[];
  timeElapsed: number;
  timeTotal: number;

  menuShown: boolean = false;
  menuPosition: Position = { x: 0, y: 0 }
  menuActions: (Action | string)[] = [
    {
      icon: "description",
      label: "Open details",
      callbackFn: () => { console.log("deets") }
    },
    {
      icon: "download",
      label: "Download",
      callbackFn: () => { }
    },
    Separator,
    {
      icon: "play_arrow",
      label: "Play",
      callbackFn: () => { console.log("play") }
    },
    {
      icon: "playlist_add",
      label: "Add to playlist",
      callbackFn: () => { }
    },
    Separator,
    {
      icon: "arrow_circle_left",
      label: "Go to game",
      callbackFn: () => { },
    },
    {
      icon: "share",
      label: "Share",
      callbackFn: () => { },
    },
  ]
  tableColumns: string[] = [
    "itemNumber",
    "songName",
    "gameName",
    "length",
    "menu"
  ]

  constructor(private playerService: PlayerService) { }

  onToggle() {
    this.toggled = !this.toggled;
  }

  onClose() {
    this.toggled = false;
  }

  percElapsed(): number {
    return (this.timeElapsed / this.timeTotal) * 100;
  }

  playPause() {
    this.playerService.playPause();
  }

  playAtIndex(idx: number) {
    this.playerService.playAtIndex(idx);
  }

  currentIndex(): number {
    return this.playerService.currentIndex();
  }

  seek($event: any) {
    let percentage = $event.layerX / ($event.target.offsetWidth - 3);

    if (percentage > 1) {
      percentage = 1;
    } else if (percentage < 0) {
      percentage = 0;
    }
    this.playerService.seek((percentage * this.timeTotal) / 1e3);
  }

  stop() {
    this.playerService.stop();
  }
  next() {
    this.playerService.next();
  }
  previous() {
    this.playerService.previous();
  }
  remove(songId: number) {
    this.playerService.removeFromPlaylist(songId)
  }


  ngOnInit(): void {
    this.subscriptions.push(
      this.playerService.state$.subscribe((state) => {
        this.isPlaying = !state.paused;
        this.timeElapsed = state.curTime * 1e3;
        this.timeTotal = state.totalTime * 1e3;
      })
    );
    this.subscriptions.push(
      this.playerService.playing$.subscribe(
        (playing) => (this.playing = playing)
      )
    );
    this.subscriptions.push(
      this.playerService.playlist$.subscribe(
        (playlist) => (this.playlist = playlist)
      )
    );
  }

  hover(idx: number) {
    this.hoverIdx = idx
  }

  nohover() {
    this.hoverIdx = -1
  }

  openMenu(e: MouseEvent) {
    this.menuPosition = {
      x: e.clientX,
      y: e.clientY
    }
    this.menuShown = true
  }
}
