import { Injectable, OnDestroy } from '@angular/core';
import { Song } from '../models/scm.model';
import { State, ThreadedPlayer } from "./player.wrapper";

import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements OnDestroy {
  private _player: ThreadedPlayer;
  private _apiUrl: string;

  state$: Observable<State>;
  playlist$: Observable<Song[]>;
  playing$: Observable<Song | null>;
  private playingSubj = new Subject<Song | null>();

  private _audio: HTMLAudioElement;

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
  }

  constructor() {
    this._audio = document.createElement("audio");
    this._audio.id = "brstm_player";
    this._audio.loop = true;
    this._audio.src = "/assets/silence.mp3";

    this._player = new ThreadedPlayer();
    this.playlist$ = this.playlistSubject.asObservable();
    this.state$ = this._player.state$;
    this.playing$ = this.playingSubj.asObservable();
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

    let url = this._apiUrl + "/" + song.song_id
    this._setMediaSessionData(song)
    this._player.play(url);
    this.playingSubj.next(song)
  }

  playAtIndex(idx: number) {
    this.play(this.playlist[idx]);
    this.currentIndex = idx
  }

  stop() {
    this._player.stop();
    this.playingSubj.next(null)
  }

  setVolume(level: number) {
    this._player.setVolume(level);
  }

  playPause() {
    if (this.currentIndex < 0) {
      if (this.playlist.length > 0)
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
    if (this.currentIndex >= 0)
      this._player.seek(to * this._player.sampleRate());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }


  async _setMediaSessionData(song?: Song) {
    this._audio
      .play()
      .then((_) => {
        if (song)
          navigator.mediaSession.metadata = new MediaMetadata({
            title: song.name,
            album: song.game_name,
            artist: song.uploader,
            artwork: [
              {
                src: "/assets/player-art.png",
                type: "image/png",
                sizes: "560x544",
              },
            ],
          });

        navigator.mediaSession.setActionHandler("play", () => {
          navigator.mediaSession.playbackState = "playing";
          this.playPause();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
          navigator.mediaSession.playbackState = "paused";
          this.playPause();
        });
        navigator.mediaSession.setActionHandler("nexttrack", () => {
          this.next();
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
          this.previous();
        });
        navigator.mediaSession.setActionHandler("seekto", (seekTime) => {
          this.seek(Number(seekTime.seekOffset));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


