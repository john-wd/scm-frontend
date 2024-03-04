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

  private playlist: Song[] = [];
  private playlistSubject = new BehaviorSubject<Song[]>([]);
  private subscriptions: Subscription[] = [];

  private _currentIndex: number = -1;
  get currentIndex(): number {
    return this._currentIndex;
  }
  set currentIndex(idx: number) {
    this._currentIndex = idx
  }

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
    let existsIdx = this.playlist.findIndex(s => s.song_id === song.song_id)
    if (existsIdx >= 0) {
      this.currentIndex = existsIdx
    } else {
      this.playlist.unshift(song)
      this.playlistSubject.next(this.playlist)
      this.currentIndex = 0
    }
    console.log(this.currentIndex)
    this._player.play(this.toInternalSong(song));
  }

  playAtIndex(idx: number) {
    this.play(this.playlist[idx]);
    this.currentIndex = idx
  }

  stop() {
    this._player.stop();
  }

  setVolume(level: number) {
    this._player.setVolume(level);
  }

  playPause() {
    if (this.currentIndex < 0) {
      if (this.playlist)
        this.playAtIndex(0)
    } else {
      this._player.playPause();
    }
  }

  next() {
    if (this.currentIndex + 1 >= this.playlist.length) return

    this.currentIndex++;
    this.playAtIndex(this.currentIndex);
  }

  previous() {
    if (this.currentIndex - 1 < 0) return

    this.currentIndex--;
    this.playAtIndex(this.currentIndex);
  }

  clearPlaylist() {
    this.currentIndex = -1
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



  seek(to: number) {
    this._player.seek(to * this._player.sampleRate);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }
}
