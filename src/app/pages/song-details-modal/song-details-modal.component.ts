import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxFilesizeModule } from 'ngx-filesize';
import { Observable } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { SongDetails } from '../../models/scm.model';
import { FormatBCSTM, FormatBFSTM, FormatBRSTM, FormatBWAV, FormatNUS3AUDIO, FormatSWBFSTM, FormatType, ScmApiService } from '../../services/scm-api.service';

@Component({
  selector: 'app-song-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    NgxFilesizeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconButton,
    MatIcon,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './song-details-modal.component.html',
  styleUrl: './song-details-modal.component.scss'
})
export class SongDetailsModal {
  song$: Observable<SongDetails>

  downloadTypes = ['brstm', 'bcstm', 'bfstm', 'sw_bfstm', 'bwav', 'nus3audio'];
  downloadTypesMap: { [type: string]: FormatType } = {
    brstm: FormatBRSTM,
    bcstm: FormatBCSTM,
    bfstm: FormatBFSTM,
    sw_bfstm: FormatSWBFSTM,
    bwav: FormatBWAV,
    nus3audio: FormatNUS3AUDIO,
  };
  selectedDownloadType = "brstm";

  constructor(
    @Inject(MAT_DIALOG_DATA) public songId: number,
    public dialogRef: MatDialogRef<SongDetailsModal>,
    private apiService: ScmApiService,
    private playerService: PlayerService,
  ) {
    this.song$ = this.apiService.fetchSongDetails(songId)
  }

  onclose() {
    this.dialogRef.close()
  }

  onPlay(song: SongDetails) {
    this.playerService.play(song);
  }

  onAddToPlaylist(song: SongDetails) {
    this.playerService.addToPlaylist(song);
  }

  onDownload(song: SongDetails) {
    this.apiService.downloadSong(this.downloadTypesMap[this.selectedDownloadType], song)
  }
}
