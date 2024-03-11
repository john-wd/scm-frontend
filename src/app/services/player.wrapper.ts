import {
  BrstmPlayer
} from "revolving-door-brstm/dist/player";
import { Observable, fromEvent, map } from "rxjs";

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

  constructor() {
    this._player = new BrstmPlayer();
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

  play(url: string) {
    this._player.play(url, {
      loopType: "infinite",
      crossfade: true,
      mediaControls: false,
    });
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

}
