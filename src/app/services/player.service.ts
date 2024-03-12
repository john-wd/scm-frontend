import { Injectable, OnDestroy } from '@angular/core';
import { Song } from '../models/scm.model';
import { State, ThreadedPlayer } from "./player.wrapper";

import { moveItemInArray } from '@angular/cdk/drag-drop';
import { StorageMap } from '@ngx-pwa/local-storage';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';

const storagePlayerKey = "player"
type storageObject = {
  playlist: Song[],
  player: {
    currentSong: Song,
    currentIndex: number,
  }
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements OnDestroy {
  private _player: ThreadedPlayer;
  private _playerLoaded: boolean;
  private _apiUrl: string;

  shuffle: boolean;

  state$: Observable<State>;
  private _playingSubj = new Subject<Song | null>();

  private _audio: HTMLAudioElement;

  private _playlist: Song[] = [];
  private _playlistSubj = new BehaviorSubject<Song[]>([]);
  private _subscriptions: Subscription[] = [];

  private _lastIndices: number[] = [];
  currentIndex: number = -1;

  get playlist$(): Observable<Song[]> {
    return this._playlistSubj.asObservable()
  }
  get playing$(): Observable<Song | null> {
    return this._playingSubj.asObservable()
  }

  configure(apiUrl: string) {
    this._apiUrl = apiUrl
  }

  constructor(
    private storage: StorageMap
  ) {
    this._audio = document.createElement("audio");
    this._audio.id = "brstm_player";
    this._audio.loop = true;
    this._audio.src = "/assets/silence.mp3";

    this._player = new ThreadedPlayer();
    this.state$ = this._player.state$;
    this.loadState()
  }

  private saveState() {
    this.storage.set(storagePlayerKey, {
      playlist: this._playlist,
      player: {
        currentSong: this._playlist[this.currentIndex],
        currentIndex: this.currentIndex
      }
    } as storageObject).subscribe(() => { })
  }
  private loadState() {
    this.storage.get(storagePlayerKey).subscribe((data) => {
      let cache = data as storageObject
      if (cache) {
        this._playlist = cache.playlist || []
        this._playlistSubj.next(this._playlist)
        if (cache.player) {
          this.currentIndex = cache.player.currentIndex
          this._playingSubj.next(cache.player.currentSong)
        }
      }
    })
  }

  play(song: Song) {
    let existsIdx = this._playlist.findIndex(s => s.song_id === song.song_id)
    if (existsIdx >= 0) {
      this.currentIndex = existsIdx
    } else {
      this._playlist.unshift(song)
      this._playlistSubj.next(this._playlist)
      this.currentIndex = 0
    }

    let url = this._apiUrl + "/" + song.song_id
    this._setMediaSessionData(song)
    this._player.play(url);
    this._playingSubj.next(song)
    this.saveState()
    this._playerLoaded = true
  }

  playAtIndex(idx: number) {
    this.play(this._playlist[idx]);
    this.currentIndex = idx
  }

  stop() {
    this._player.stop();
    this._playingSubj.next(null)
  }

  setVolume(level: number) {
    this._player.setVolume(level);
  }

  playPause() {
    if (this.currentIndex < 0) {
      if (this._playlist.length > 0)
        this.playAtIndex(0)
    } else {
      if (this._playerLoaded)
        this._player.playPause();
      else
        this.playAtIndex(this.currentIndex)
    }
  }

  next() {
    this._lastIndices.push(this.currentIndex)
    if (this.shuffle) {
      let idx = pickRandomIdx(this._playlist)
      this.currentIndex = idx
    } else {
      if (this.currentIndex + 1 >= this._playlist.length) return
      this.currentIndex++;
    }
    this.playAtIndex(this.currentIndex);
  }

  previous() {
    if (this.shuffle) {
      if (this._lastIndices.length > 0) {
        let idx = this._lastIndices.pop()
        if (!idx)
          return
        this.currentIndex = idx
      }
    } else {
      if (this.currentIndex - 1 < 0) return
      this.currentIndex--;
    }

    this.playAtIndex(this.currentIndex);
  }

  sortElementInPlaylist(prevIdx: number, nextIdx: number) {
    moveItemInArray(this._playlist, prevIdx, nextIdx)
    this._playlistSubj.next(this._playlist)
    this.saveState()
  }

  clearPlaylist() {
    this.currentIndex = -1
    this._playlist = [];
    this._playlistSubj.next(this._playlist)
    this.saveState()
  }

  addToPlaylist(song: Song) {
    if (this._playlist.findIndex(s => s.song_id === song.song_id) >= 0)
      return

    this._playlist.push(song)
    this._playlistSubj.next(this._playlist)
    this.saveState()
  }

  removeFromPlaylist(songId: number) {
    this._playlist = this._playlist.filter(s => {
      return s.song_id !== songId
    })
    this._playlistSubj.next(this._playlist);
    this.saveState()
  }

  seek(to: number) {
    if (this.currentIndex >= 0)
      this._player.seek(to * this._player.sampleRate());
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }


  private async _setMediaSessionData(song?: Song) {
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

function pickRandomIdx(arr: any[]): number {
  return Math.floor(Math.random() * arr.length)
}
