import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from '../../models/scm.model';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { FormatBRSTM, ScmApiService } from '../../services/scm-api.service';
import { MatDivider } from '@angular/material/divider';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatMenuTrigger, MatMenu, MatMenuContent, MatMenuItem } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatCellDef, MatCell, MatRowDef, MatRow } from '@angular/material/table';
import { NgIf, NgTemplateOutlet, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SongDetailsModal } from 'src/app/pages/song-details-modal/song-details-modal.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    NgTemplateOutlet,
    MatTable,
    MatColumnDef,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatMenuTrigger,
    MatRowDef,
    MatRow,
    MatSlider,
    MatSliderThumb,
    MatMenu,
    MatMenuContent,
    MatMenuItem,
    MatDivider,
    DatePipe,
  ],
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

  tableColumns: string[] = [
    "itemNumber",
    "songName",
    "gameName",
    "length",
    "menu"
  ]

  routeToGame(gameId: number) {
    this.toggled = false
    this.router.navigate(["/explore/games", gameId])
  }
  onToggle() {
    this.toggled = !this.toggled;
  }

  onClose() {
    this.toggled = false;
  }

  onOpenDetails(song: Song) {
    this.dialog.open(SongDetailsModal, {
      data: song.song_id
    })
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

  downloadSong(song: Song) {
    this.apiService.downloadSong(FormatBRSTM, song)
  }


  constructor(
    private playerService: PlayerService,
    private apiService: ScmApiService,
    private router: Router,
    private dialog: MatDialog,
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
