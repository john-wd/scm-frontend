import { Component, Inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Song } from '../../smashcustommusic/models/scm.model';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormatBCSTM, FormatBFSTM, FormatBRSTM, FormatBWAV, FormatNUS3AUDIO, FormatSWBFSTM, FormatType, ScmApiService } from '../../smashcustommusic/services/scm-api.service';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxFilesizeModule } from 'ngx-filesize';

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
  styleUrl: './song-details-modal.component.sass'
})
export class SongDetailsModal {
  song$: Observable<Song>

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
  ) {
    this.song$ = this.apiService.fetchSongDetails(songId)
  }

  onclose() {
    this.dialogRef.close()
  }
}
