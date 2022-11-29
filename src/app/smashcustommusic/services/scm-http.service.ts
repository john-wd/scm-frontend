import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SongList, GameList, Song } from '../models/scm.model';

@Injectable({
  providedIn: 'root',
})
export class ScmApiService {
  private _baseUrl = 'https://smashcustommusic.net/json';
  constructor(private _http: HttpClient) {}

  fetchGamelist(): Observable<GameList.Root> {
    return this._http.get<GameList.Root>(`${this._baseUrl}/gamelist/`);
  }

  fetchSonglist(gameId: number): Observable<SongList.Root> {
    return this._http
      .get<SongList.Root>(`${this._baseUrl}/game/${gameId}`)
      .pipe(
        map((game) => ({
          ...game,
          game_id: gameId,
        }))
      );
  }

  fetchSongDetails(songId: number): Observable<Song> {
    return this._http.get<Song>(`${this._baseUrl}/game/${songId}`).pipe(
      map((song) => ({
        ...song,
        song_id: songId,
      }))
    );
  }
}
