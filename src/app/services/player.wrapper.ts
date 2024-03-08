import {
  BrstmPlayer,
  Song as InternalSong,
} from "revolving-door-brstm/dist/player";
import { Observable, fromEvent, map } from "rxjs";
import { Song } from "../models/scm.model";

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

export class ThreadedPlayer {
  private _player: BrstmPlayer;
  state$: Observable<State>;
  playing$: Observable<Song>;

  constructor() {
    this._player = new BrstmPlayer();
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
  }

  play(url: string, song: Song) {
    this._player.play(url, this.toInternalSong(song));
  }

  playPause() {
    this._player.playPause();
  }

  stop() {
    this._player.stop();
  }

  seek(sample: number) {
    this._player.seek(sample);
  }

  sampleRate(): number {
    return this._player.sampleRate;
  }

  setVolume(level: number) {
    this._player.setVolume(level);
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
}
