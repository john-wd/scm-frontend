import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/scm.model';
import { SongDetailsModal } from 'src/app/pages/song-details-modal/song-details-modal.component';
import { PlayerService } from 'src/app/services/player.service';
import { FormatBRSTM, ScmApiService } from 'src/app/services/scm-api.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    CdkVirtualScrollViewport,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    DatePipe
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  @Output() close = new EventEmitter();
  playlist$: Observable<Song[]>;
  hoverIdx = -1;

  constructor(
    private playerService: PlayerService,
    private apiService: ScmApiService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.playlist$ = this.playerService.playlist$
  }

  get isShuffle(): boolean {
    return this.playerService.shuffle
  }

  toggleShuffle() {
    this.playerService.toggleShuffle()
  }

  playAtIndex(idx: number) {
    this.playerService.playAtIndex(idx);
  }

  currentIndex(): number {
    return this.playerService.currentIndex;
  }

  onOpenDetails(song: Song) {
    this.dialog.open(SongDetailsModal, {
      data: song.song_id
    })
  }

  routeToGame(gameId: number) {
    this.router.navigate(["/explore/games", gameId])
    this.close.emit()
  }

  downloadSong(song: Song) {
    this.apiService.downloadSong(FormatBRSTM, song)
  }

  remove(songId: number) {
    this.playerService.removeFromPlaylist(songId)
  }

  clear() {
    this.playerService.clearPlaylist()
  }

  hover(idx: number) {
    this.hoverIdx = idx
  }

  nohover() {
    this.hoverIdx = -1
  }

  dragDrop($event: CdkDragDrop<Song[]>) {
    this.playerService.sortElementInPlaylist($event.previousIndex, $event.currentIndex)
  }

}
