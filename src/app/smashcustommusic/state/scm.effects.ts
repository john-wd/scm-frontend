import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs';
import { of } from 'rxjs';
import { ScmApiService } from '../services/scm-api.service';
import { fetchGamelist, fetchSonglist, fetchSongDetails } from './scm.actions';

@Injectable()
export class ScmEffects {
  fetchGamelist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchGamelist.action),
      mergeMap(() =>
        this.scmService.fetchGamelist().pipe(
          map((games) => fetchGamelist.success({ games })),
          catchError(() =>
            of(fetchGamelist.error({ error: 'failed to fetch game list' }))
          )
        )
      )
    )
  );

  fetchSonglist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSonglist.action),
      mergeMap((action) =>
        this.scmService.fetchSonglist(action.gameId).pipe(
          map((songs) => fetchSonglist.success({ songs })),
          catchError(() =>
            of(
              fetchSonglist.error({
                error: `failed to fetch song list for game ${action.gameId}`,
              })
            )
          )
        )
      )
    )
  );

  fetchSongDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSongDetails.action),
      mergeMap((action) =>
        this.scmService.fetchSongDetails(action.songId).pipe(
          map((song) => fetchSongDetails.success({ song })),
          catchError(() =>
            of(
              fetchSonglist.error({
                error: `failed to fetch song details for song ${action.songId}`,
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private scmService: ScmApiService) {}
}
