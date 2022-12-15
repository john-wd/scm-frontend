import { Injectable } from '@angular/core';
import { Song } from '../models/scm.model';
// const br = require('revolving-door-brstm/built/player');
import { BrstmPlayer } from 'revolving-door-brstm/dist/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _player: any;
  private _apiUrl = 'https://smashcustommusic.net/brstm';

  constructor() {
    this._player = new BrstmPlayer(this._apiUrl);
  }

  play(song: Song) {
    this._player.play({
      id: song.song_id,
      name: song.name,
      length: song.length,
      loop: song.loop_type,
      uploader: song.uploader,
      available: song.available,
      downloads: song.downloads,
      game_name: song.game_name,
    });
  }
}
