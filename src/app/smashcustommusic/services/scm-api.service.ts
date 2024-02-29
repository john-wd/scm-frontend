import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SongList, GameList, Song } from '../models/scm.model';


export type FormatType = {
  slug: string,
  label: string,
}

export const FormatBRSTM: FormatType = {
  slug: "brstm",
  label: "BRSTM (Wii)",
}
export const FormatBCSTM: FormatType = {
  slug: "bcstm",
  label: "BCSTM",
}
export const FormatBFSTM: FormatType = {
  slug: "bfstm",
  label: "BFSTM (Wii U)"
}
export const FormatSWBFSTM: FormatType = {
  slug: "sw_bfstm",
  label: "BFSTM (Switch)"
}
export const FormatBWAV: FormatType = {
  slug: "bwav",
  label: "BWAV"
}
export const FormatNUS3AUDIO: FormatType = {
  slug: "nus3audio",
  label: "NUS3Audio"
};

@Injectable({
  providedIn: 'root',
})
export class ScmApiService {
  private _apiUrl: string;
  constructor(private _http: HttpClient) { }


  configure(apiUrl: string) {
    this._apiUrl = apiUrl
  }

  fetchGamelist(): Observable<GameList.Root> {
    return this._http.get<GameList.Root>(`${this._apiUrl}/json/gamelist/`);
  }

  fetchSonglist(gameId: number): Observable<SongList.Root> {
    return this._http
      .get<SongList.Root>(`${this._apiUrl}/json/game/${gameId}`)
      .pipe(
        map((game) => ({
          ...game,
          game_id: gameId,
        }))
      );
  }

  fetchSongDetails(songId: number): Observable<Song> {
    return this._http.get<Song>(`${this._apiUrl}/json/song/${songId}`).pipe(
      map((song) => ({
        ...song,
        song_id: songId,
      }))
    );
  }

  getBannerUrl(gameId: number): string {
    return `${this._apiUrl}/logos/${gameId}`;
  }

  downloadSong(type: FormatType, song: Song) {
    let url = `${this._apiUrl}/${type.slug}/${song.song_id}`;
    const a = document.createElement('a');
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
