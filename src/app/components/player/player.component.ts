import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DatePipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatCell, MatCellDef, MatColumnDef, MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Song } from '../../models/scm.model';
import { PlayerService } from '../../services/player.service';
import { Loop, LoopSelectorComponent } from '../loop-selector/loop-selector.component';
import { PlaylistComponent } from '../playlist/playlist.component';

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
    DatePipe,
    PlaylistComponent,
    LoopSelectorComponent,
  ],
  animations: [
    trigger("openClose", [
      state("true", style({
        height: "92%",
      })),
      state("false", style({
      })),
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

  isPlaying: boolean;
  playing: Song | null;
  timeElapsedPerc: number;
  timeElapsed: number = 0;
  timeTotal: number = 0;

  globalLoopSetting: Loop

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
  }

}
