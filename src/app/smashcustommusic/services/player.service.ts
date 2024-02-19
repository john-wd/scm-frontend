import { Injectable, OnDestroy } from '@angular/core';
import { Song } from '../models/scm.model';
import {
  BrstmPlayer,
  Song as InternalSong,
} from 'revolving-door-brstm/dist/player';

import mockData from './playlist.mock.data.json'

import {
  fromEvent,
  map,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';

export interface State {
  position: number;
  paused: boolean;
  volume: number;
  loaded: boolean;
  looping: boolean;
  totalTime: number;
  curTime: number;
  sampleRate: number;
}
@Injectable({
  providedIn: 'root',
})
export class PlayerService implements OnDestroy {
  private _player: any;
  private _apiUrl = 'http://localhost:9999/brstm';

  state$: Observable<State>;
  playlist$: Observable<Song[]>;
  playing$: Observable<Song>;

  private playlistSubject: Subject<Song[]>;
  private subscriptions: Subscription[] = [];

  constructor() {
    this._player = new BrstmPlayer(this._apiUrl);
    this.playing$ = fromEvent(document, 'brstm_play').pipe(
      map((evt: any) => {
        return evt.detail as Song;
      })
    );
    this.state$ = fromEvent(document, 'brstm_step').pipe(
      map((evt: any) => {
        let sampleRate = this._player.sampleRate;
        return {
          ...evt.detail,
          totalTime: this._player.getSongLength(),
          curTime: evt.detail.position / sampleRate,
          sampleRate: sampleRate,
        } as State;
      })
    );
    this.playlistSubject = new Subject<Song[]>();
    this.playlist$ = this.playlistSubject.asObservable();
    // this.playlist$ = of(mockData as Song[])

    this.subscriptions.push(
      fromEvent(document, 'brstm_playlist_add').subscribe((evt: any) => {
        this.playlistSubject.next(this._player.playlist);
      })
    );

    this.subscriptions.push(
      fromEvent(document, 'brstm_playlist_remove').subscribe((evt: any) => {
        this.playlistSubject.next(this._player.playlist);
      })
    );
  }

  private toInternalSong(song: Song): InternalSong {
    return {
      song_id: song.song_id,
      name: song.name,
      uploader: song.uploader,
      game_name: song.game_name,
      game_id: Number(song.game_id),
    };
  }

  play(song: Song) {
    this._player.play(this.toInternalSong(song));
  }

  playAtIndex(idx: number) {
    this._player.playAtIndex(idx);
  }

  stop() {
    this._player.stop();
  }

  setVolume(level: number) {
    this._player.setVolume(level);
  }

  playPause() {
    this._player.playPause();
  }

  next() {
    this._player.next();
  }

  previous() {
    this._player.previous();
  }

  clearPlaylist() {
    this._player.clearPlaylist();
  }

  addToPlaylist(song: Song) {
    this._player.addToPlaylist(this.toInternalSong(song));
  }

  removeFromPlaylist(songId: number) {
    this._player.removeFromPlaylist(songId);
    this.playlistSubject.next(this._player.playlist);
  }

  currentIndex(): number {
    return this._player.currentIndex;
  }

  seek(to: number) {
    this._player.seek(to * this._player.sampleRate);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }
}
