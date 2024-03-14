import {
  BrstmPlayer,
  LoopType as PlayerLoopType,
  Options as PlayerOptions
} from "revolving-door-brstm/dist/player";
import { Observable, fromEvent, map } from "rxjs";

export type Options = PlayerOptions
export type LoopType = PlayerLoopType
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

export class PlayerWrapper {
  private _player: BrstmPlayer;
  state$: Observable<State>;
  next$: Observable<any>;

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
    this.next$ = fromEvent(document, "brstm_next")
  }

  play(url: string, options?: Options) {
    let opts: Options = {
      loopType: "count", // loop 3 times by default
      loopFor: 3,
      mediaControls: false,
      crossfade: true,
      ...options
    }

    console.log(opts)
    this._player.play(url, opts);
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
