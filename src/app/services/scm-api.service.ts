import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Api, Gamelist, Song, SongDetails, Songlist } from '../models/scm.model';


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

  fetchGamelist(): Observable<Gamelist> {
    return this._http.get<Api.Gamelist>(`${this._apiUrl}/json/gamelist/`).pipe(map(resp => {
      return {
        game_count: resp.game_count,
        song_count: resp.total_song_count,
        games: resp.games.map(game => {
          return {
            game_id: game.game_id,
            game_name: game.game_name,
            song_count: game.song_count,
          }
        })
      } as Gamelist
    }));
  }

  fetchSonglist(gameId: number): Observable<Songlist> {
    return this._http
      .get<Api.Songlist>(`${this._apiUrl}/json/game/${gameId}`)
      .pipe(
        map((resp) => {
          return {
            game_banner_exists: resp.game_banner_exists,
            game_id: gameId,
            game_name: resp.game_name,
            song_count: resp.track_count,
            songs: resp.songs.map(song => {
              return {
                game_id: gameId.toString(),
                game_name: resp.game_name,
                song_id: song.song_id,
                song_name: song.song_name,
                downloads: song.song_downloads,
                uploader: song.song_uploader,
                length: Number(song.song_length) * 1e3,
                loop: Api.loopForApiLoop(song.song_loop as Api.ApiLoop),
              }
            })
          } as Songlist
        })
      );
  }

  fetchSongDetails(songId: number): Observable<SongDetails> {
    return this._http.get<Api.Song>(`${this._apiUrl}/json/song/${songId}`).pipe(
      map((song) => {
        return {
          game_id: song.game_id.toString(),
          song_id: song.song_id,
          song_name: song.name,
          downloads: song.downloads,
          uploader: song.uploader,
          length: Number(song.length) * 1e3,
          loop: Api.loopForApiLoop(song.loop_type as Api.ApiLoop),
          game_name: song.game_name,
          description: song.description,
          filesize: song.size,
          game_banner_exists: song.game_banner_exists,
          loop_end: song.end_loop_point,
          loop_start: song.start_loop_point,
          sample_rate: song.sample_rate,
        } as SongDetails
      })
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
