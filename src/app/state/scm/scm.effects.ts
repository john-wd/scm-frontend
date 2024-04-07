import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { ScmApiService } from '../../services/scm-api.service';
import { fetchGamelist, fetchSongDetails, fetchSonglist, setLoading } from './scm.actions';
import { getGamelistUIState, getState } from './scm.selector';

@Injectable()
export class ScmEffects {
  fetchGamelist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchGamelist.action),
      withLatestFrom(this.store$.select(getGamelistUIState)),
      switchMap(([action, state]) => {
        if (state.loaded)
          return of(setLoading({ loading: false, page: "gamelist" }))


        return this.scmService.fetchGamelist().pipe(
          map((gamelist) => fetchGamelist.success({ gamelist })),
          catchError(() =>
            of(fetchGamelist.error({ error: 'failed to fetch game list' }))
          )
        )
      })
    )
  );

  fetchSonglist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSonglist.action),
      withLatestFrom(this.store$.select(getState)),
      switchMap(([action, state]) => {
        if (state.ui.pages.songlist.loaded && Object.hasOwn(state.entities.songsByGame, action.gameId))
          return of(setLoading({ loading: false, page: "songlist" }))


        return this.scmService.fetchSonglist(action.gameId).pipe(
          map((songlist) => fetchSonglist.success({ songlist })),
          catchError(() =>
            of(
              fetchSonglist.error({
                error: `failed to fetch song list for game ${action.gameId}`,
              })
            )
          )
        )
      })
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

  constructor(
    private actions$: Actions,
    private scmService: ScmApiService,
    private store$: Store,
  ) { }
}
