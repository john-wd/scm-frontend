import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DatePipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatCell, MatCellDef, MatColumnDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { Observable, Subscription } from 'rxjs';
import { Loop, Song } from '../../models/scm.model';
import { PlayerService } from '../../services/player.service';
import { LoopSelectorComponent } from '../loop-selector/loop-selector.component';
import { PlaylistComponent } from '../playlist/playlist.component';
import { VolumeComponent } from '../volume/volume.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    MatProgressSpinner,
    MatProgressBar,
    MatTooltip,
    DatePipe,
    PlaylistComponent,
    LoopSelectorComponent,
    VolumeComponent,
  ],
  animations: [
    trigger("openClose", [
      state("true", style({
        height: "92%",
        zIndex: 90
      })),
      state("false", style({})),
      transition("true => false", [
        animate("200ms ease-out")
      ]),
      transition("false => true", [
        animate("200ms ease-out")
      ])
    ])
  ]
})
export class PlayerComponent implements OnInit {
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) { this.toggled = false }
  toggled = false;

  private subscriptions: Subscription[] = [];

  buffering$: Observable<boolean>;
  isPlaying: boolean;
  playing: Song | null;
  timeElapsedPerc: number;
  timeElapsed: number = 0;
  timeTotal: number = 0;

  get globalLoopSetting(): Loop {
    return this.playerService.globalLoop
  }
  setLoop(loop: Loop) {
    this.playerService.setLoop(loop)
  }

  get isShuffle(): boolean {
    return this.playerService.shuffle
  }

  toggleShuffle() {
    this.playerService.toggleShuffle()
  }

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

  seek(perc: string) {
    if (this.playerService.currentIndex < 0)
      return

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

  constructor(
    private playerService: PlayerService,
  ) {
    this.buffering$ = playerService.buffering$
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.playerService.playing$.subscribe(
        (playing) => {
          this.playing = playing
        }
      )
    );
    this.subscriptions.push(
      this.playerService.state$.subscribe((state) => {
        this.timeElapsed = state.curTime * 1e3;
        this.timeTotal = state.totalTime * 1e3;
        this.isPlaying = !state.paused
      })
    );
  }

}
