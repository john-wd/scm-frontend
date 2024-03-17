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
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Loop, Song } from 'src/app/models/scm.model';
import { PlayerService } from 'src/app/services/player.service';
import { FormatBRSTM, ScmApiService } from 'src/app/services/scm-api.service';
import { templateStr } from 'src/app/shared/utils/template';
import { LoopSelectorComponent } from '../loop-selector/loop-selector.component';
import { ShareModal } from '../share-modal/share-modal.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    DatePipe,
    LoopSelectorComponent
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
    public dialog: MatDialog
  ) {
    this.playlist$ = this.playerService.playlist$
  }

  get isShuffle(): boolean {
    return this.playerService.shuffle
  }

  playAtIndex(idx: number) {
    this.playerService.playAtIndex(idx);
  }

  currentIndex(): number {
    return this.playerService.currentIndex;
  }

  routeToGame(gameId: number) {
    this.router.navigate(["/explore/games", gameId])
    this.close.emit()
  }

  editSongLoop(songId: number, loop: Loop) {
    this.playerService.editSongLoop(songId, loop)
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

  openSongShareDialog(song: Song) {
    let details = templateStr`From ${"game_name"}, length ${"length"}. ${"downloads"} downloads`
    const datePipe = new DatePipe('en-US');
    this.dialog.open(ShareModal, {
      data: {
        resourceType: "song",
        resourceId: song.song_id,
        title: song.name,
        description: details({
          game_name: song.game_name,
          length: datePipe.transform(song.length * 1e3, "mm 'minutes and' ss 'seconds'"),
          downloads: song.downloads
        })
      }
    })
  }
}
