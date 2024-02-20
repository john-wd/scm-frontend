import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../models/scm.model';
import { PlayerService } from '../../services/player.service';
import { Action, ContextMenuService, Separator } from 'src/app/shared/services/context-menu-service.service';
import { Router } from '@angular/router';
import { FormatBRSTM, ScmApiService } from '../../services/scm-api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass'],
})
export class PlayerComponent implements OnInit {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) { this.toggled = false }
  toggled = false;

  hoverIdx = -1;
  private subscriptions: Subscription[] = [];

  isPlaying: boolean;
  playing: Song;
  playlist: Song[];
  timeElapsedPerc: number;
  timeElapsed: number = 0;
  timeTotal: number = 0;

  menuActionsAtIdx(idx: number): (Action | string)[] {
    return [

      {
        icon: "play_arrow",
        label: "Play",
        callbackFn: () => { this.playAtIndex(idx) }
      },
      {
        icon: "delete",
        label: "Remove",
        callbackFn: () => {
          let song = this.playlist.at(idx)
          if (song)
            this.remove(song.song_id)
        }
      },
      Separator,
      {
        icon: "description",
        label: "Open details",
        callbackFn: () => { console.log("deets") }
      },
      {
        icon: "download",
        label: "Download",
        callbackFn: () => {
          let song = this.playlist.at(idx)
          if (song)
            this.apiService.downloadSong(FormatBRSTM, song)
        }
      },
      Separator,
      {
        icon: "arrow_circle_left",
        label: "Go to game",
        callbackFn: () => {
          let song = this.playlist.at(idx)
          if (song) {
            console.log(song)
            this.toggled = false
            this.router.navigate(["gamelist", song.game_id])
          }
        },
      },
      {
        icon: "share",
        label: "Share",
        callbackFn: () => { },
      },
    ]
  }
  tableColumns: string[] = [
    "itemNumber",
    "songName",
    "gameName",
    "length",
    "menu"
  ]


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

  seek(perc: string) {
    let percentage = Number(perc) / 100

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


  constructor(
    private playerService: PlayerService,
    private apiService: ScmApiService,
    private router: Router,
  ) { }
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
}
