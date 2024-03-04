import { Injectable, OnDestroy } from '@angular/core';
import { Song } from '../models/scm.model';
import {
  BrstmPlayer,
  Song as InternalSong,
} from 'revolving-door-brstm/dist/player';

import {
  BehaviorSubject,
  fromEvent,
  map,
  Observable,
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
  private _apiUrl: string;

  state$: Observable<State>;
  playlist$: Observable<Song[]>;
  playing$: Observable<Song>;

  private _currentIndex: number;
  private playlist: Song[] = [];
  private playlistSubject = new BehaviorSubject<Song[]>([]);
  private subscriptions: Subscription[] = [];

  configure(apiUrl: string) {
    this._apiUrl = apiUrl
    this._player = new BrstmPlayer(this._apiUrl);
  }

  constructor() {
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
    this.playlist$ = this.playlistSubject.asObservable();
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
    this.play(this.playlist[idx]);
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
    if (this._currentIndex + 1 > this.playlist.length) return

    this._currentIndex++;
    this.playAtIndex(this._currentIndex);
  }

  previous() {
    if (this._currentIndex - 1 < 0) return

    this._currentIndex--;
    this.playAtIndex(this._currentIndex);
  }

  clearPlaylist() {
    this.playlist = [];
    this.playlistSubject.next(this.playlist)
  }

  addToPlaylist(song: Song) {
    this.playlist.push(song)
    this.playlistSubject.next(this.playlist)
  }

  removeFromPlaylist(songId: number) {
    this.playlist = this.playlist.filter(s => {
      return s.song_id !== songId
    })
    this.playlistSubject.next(this.playlist);
  }

  currentIndex(): number {
    return this._currentIndex;
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
