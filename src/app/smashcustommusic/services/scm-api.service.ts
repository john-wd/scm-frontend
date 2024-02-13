import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, Observable } from 'rxjs';
import { SongList, GameList, Song } from '../models/scm.model';

@Injectable({
  providedIn: 'root',
})
export class ScmApiService {
  private _baseUrl = 'http://localhost:9999';
  constructor(private _http: HttpClient) {}

  fetchGamelist(): Observable<GameList.Root> {
    return this._http.get<GameList.Root>(`${this._baseUrl}/json/gamelist/`);
  }

  fetchSonglist(gameId: number): Observable<SongList.Root> {
    return this._http
      .get<SongList.Root>(`${this._baseUrl}/json/game/${gameId}`)
      .pipe(
        map((game) => ({
          ...game,
          game_id: gameId,
        }))
      );
  }

  fetchSongDetails(songId: number): Observable<Song> {
    return this._http.get<Song>(`${this._baseUrl}/json/song/${songId}`).pipe(
      map((song) => ({
        ...song,
        song_id: songId,
      }))
    );
  }

  getBannerUrl(gameId: number): string {
    return `${this._baseUrl}/logos/${gameId}`;
  }

  downloadSong(type: string, songId: number) {
    let url = `${this._baseUrl}/${type}/${songId}`;
    const a = document.createElement('a');
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
