import { createReducer, on } from '@ngrx/store';

import * as fromActions from './scm.actions';
import { GameList, Song, SongList } from '../models/scm.model';

export const scmFeatureKey = 'scm';

export interface State {
  meta: {
    loading: boolean;
    loaded: boolean;
    last_error?: string | null;
  };
  gamelist: GameList.Root;
  songlist: { [gameId: number]: SongList.Root };
  selected: { [songId: number]: Song };
}

export const initialState: State = {
  meta: {
    loaded: false,
    loading: false,
  },
  gamelist: {
    game_count: 0,
    games: [],
    ok: false,
    total_song_count: 0,
  },
  songlist: {},
  selected: {},
};

export const scmReducer = createReducer(
  initialState,
  on(fromActions.meta.reset, () => ({ ...initialState })),
  on(fromActions.fetchGamelist.action, (state) => setLoading(state)),
  on(fromActions.fetchGamelist.error, (state, { error }) =>
    setErrored(state, error)
  ),
  on(fromActions.fetchGamelist.success, (state, { games }) => ({
    ...state,
    meta: {
      loaded: true,
      loading: false,
    },
    gamelist: games,
  })),
  on(fromActions.fetchSongDetails.action, (state) => setLoading(state)),
  on(fromActions.fetchSongDetails.error, (state, { error }) =>
    setErrored(state, error)
  ),
  on(fromActions.fetchSongDetails.success, (state, { song }) => ({
    ...state,
    meta: {
      loaded: true,
      loading: false,
    },
    selected: {
      [song.song_id]: song,
    },
  })),
  on(fromActions.fetchGamelist.action, (state) => setLoading(state)),
  on(fromActions.fetchGamelist.error, (state, { error }) =>
    setErrored(state, error)
  ),
  on(fromActions.fetchSonglist.success, (state, { songs }) => ({
    ...state,
    meta: {
      loaded: true,
      loading: false,
    },
    songlist: {
      [songs.game_id]: songs,
    },
  }))
);

function setLoading(state: State): State {
  return {
    ...state,
    meta: {
      loaded: false,
      loading: true,
      last_error: null,
    },
  };
}

function setErrored(state: State, error: string): State {
  return {
    ...state,
    meta: {
      loaded: true,
      loading: false,
      last_error: error,
    },
  };
}
