import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../../models/scm.model';
import { ScmApiService } from '../../services/scm-api.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.sass'],
})
export class SongDetailsComponent implements OnInit {
  @Input()
  song: Song | null;
  keys = [
    'name',
    'uploader',
    'approved_by',
    'downloads',
    'theme_type',
    'remix',
    'description',
    'loop_type',
    'start_loop_point',
    'end_loop_point',
    'sample_rate',
    'length',
    'size',
  ];
  keyTitles: { [string: string]: { value: string; type: string } } = {
    name: {
      value: 'Song name',
      type: 'string',
    },
    uploader: {
      value: 'Uploader',
      type: 'string',
    },
    approved_by: {
      value: 'Approved by',
      type: 'string',
    },
    downloads: {
      value: 'Number of downloads',
      type: 'number',
    },
    theme_type: {
      value: 'Song type',
      type: 'string',
    },
    remix: {
      value: 'Is remix?',
      type: 'bool',
    },
    description: {
      value: 'Description',
      type: 'string',
    },
    loop_type: {
      value: 'Loop type',
      type: 'string',
    },
    start_loop_point: {
      value: 'Loop start point',
      type: 'number',
    },
    end_loop_point: {
      value: 'Loop end point',
      type: 'number',
    },
    sample_rate: {
      value: 'Sample rate',
      type: 'number',
    },
    length: {
      value: 'Song length',
      type: 'time',
    },
    size: {
      value: 'File size',
      type: 'filesize',
    },
  };

  downloadTypes = ['brstm', 'bcstm', 'bfstm', 'sw_bfstm', 'bwav', 'nus3audio'];
  downloadTypesMap: { [type: string]: string } = {
    brstm: 'BRSTM',
    bcstm: 'BCSTM',
    bfstm: 'BFSTM (Wii U)',
    sw_bfstm: 'BFSTM (Switch)',
    bwav: 'BWAV',
    nus3audio: 'NUS3Audio',
  };
  selectedDownloadType = 'brstm';

  constructor(private scmApi: ScmApiService) {}

  ngOnInit(): void {}

  getField(key: string): string {
    if (!this.song) return '';
    return this.song[key as keyof {}];
  }

  asNumber(val: any): number {
    return Number(val);
  }

  onDownload() {
    if (!this.song) return;
    this.scmApi.downloadSong(this.selectedDownloadType, this.song.song_id);
  }
}
