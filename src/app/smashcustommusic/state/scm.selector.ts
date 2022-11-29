import { createFeatureSelector, createSelector } from '@ngrx/store';
import { scmFeatureKey, State } from './scm.reducer';

export const getState = createFeatureSelector<State>(scmFeatureKey);

export const getGamelist = createSelector(
  getState,
  (state: State) => state.gamelist
);

export const getMeta = createSelector(getState, (state: State) => state.meta);

export const getSonglist = createSelector(
  getState,
  (state: State) => state.songlist
);

export const getSelection = createSelector(
  getState,
  (state: State) => state.selection
);
