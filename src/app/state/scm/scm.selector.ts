import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, scmFeatureKey } from './scm.reducer';

export const getState = createFeatureSelector<State>(scmFeatureKey);

export const getGamelistEntity = createSelector(
  getState,
  (state: State) => state.entities.games
);

export const getGamelistTotalGameCount = createSelector(
  getState,
  (state: State) => state.entities.game_count
);

export const getGamelistTotalSongCount = createSelector(
  getState,
  (state: State) => state.entities.total_song_count
);

export const getSonglistEntityById = (songId: number) => createSelector(
  getState,
  (state: State) => state.entities.songsByGame[songId]
);

export const getPlayerUIState = createSelector(
  getState,
  (state: State) => state.ui.pages.player
)
export const getGamelistUIState = createSelector(
  getState,
  (state: State) => state.ui.pages.gamelist
)
export const getSonglistUIState = createSelector(
  getState,
  (state: State) => state.ui.pages.songlist
)
export const getSongdetailsUIState = createSelector(
  getState,
  (state: State) => state.ui.pages.songdetails
)
