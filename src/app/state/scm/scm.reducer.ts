import { createReducer, on } from '@ngrx/store';

import { produce } from "immer";
import { Game, Songlist } from '../../models/scm.model';
import * as fromActions from './scm.actions';

export const scmFeatureKey = 'scm';

type UiState = {
  loading: boolean;
  loaded: boolean;
  error?: string;
}

export interface State {
  entities: {
    games: Game[],
    songsByGame: {
      [game_id: number]: Songlist
    }
    game_count: number,
    total_song_count: number,
  },
  ui: {
    pages: {
      player: UiState,
      gamelist: UiState,
      songlist: UiState,
      songdetails: UiState,
    }
  }
}

export const initialState: State = {
  entities: {
    games: [],
    songsByGame: {},
    game_count: 0,
    total_song_count: 0,
  },
  ui: {
    pages: {
      player: { loaded: false, loading: false },
      gamelist: { loaded: false, loading: false },
      songlist: { loaded: false, loading: false },
      songdetails: { loaded: false, loading: false },
    }
  }
};

export const scmReducer = createReducer(
  initialState,
  on(fromActions.meta.reset, () => ({ ...initialState })),
  on(fromActions.fetchGamelist.action, (state) => produce(state, draft => {
    draft.ui.pages.gamelist.loading = true
    draft.ui.pages.gamelist.error = undefined
  })),
  on(fromActions.fetchGamelist.error, (state, { error }) => produce(state, draft => {
    draft.ui.pages.gamelist = {
      loaded: false,
      loading: false,
      error: error
    }
  })),
  on(fromActions.fetchGamelist.success, (state, { gamelist }) => produce(state, draft => {
    draft.entities.game_count = gamelist.game_count
    draft.entities.total_song_count = gamelist.song_count
    draft.entities.games = gamelist.games
    draft.ui.pages.gamelist = {
      loaded: true,
      loading: false,
      error: undefined
    }
  })),
  on(fromActions.fetchSongDetails.action, (state) => produce(state, draft => {
    draft.ui.pages.songdetails.loading = true
    draft.ui.pages.songdetails.error = undefined
  })),
  on(fromActions.fetchSongDetails.error, (state, { error }) => produce(state, draft => {
    draft.ui.pages.songdetails = {
      loaded: false,
      loading: false,
      error: error
    }
  })),
  on(fromActions.fetchSongDetails.success, (state, { song }) => produce(state, draft => {
    draft.ui.pages.songdetails = {
      loaded: true,
      loading: false,
      error: undefined
    }
  })),
  on(fromActions.fetchSonglist.action, (state, { gameId }) => produce(state, draft => {
    draft.ui.pages.songlist.loading = true
    draft.ui.pages.songlist.error = undefined
  })),
  on(fromActions.fetchSonglist.error, (state, { error }) => produce(state, draft => {
    draft.ui.pages.songlist = {
      loaded: false,
      loading: false,
      error: error
    }
  })),
  on(fromActions.fetchSonglist.success, (state, { songlist }) => produce(state, draft => {
    draft.entities.songsByGame[songlist.game_id] = songlist
    draft.ui.pages.songlist = {
      loaded: true,
      loading: false,
      error: undefined
    }
  })),
  on(fromActions.setLoading, (state, { loading, page }) => produce(state, draft => {
    if (Object.hasOwn(draft.ui.pages, page)) {
      let curPage = (draft.ui.pages as any)[page] as UiState
      (draft.ui.pages as any)[page] = {
        ...curPage,
        loading: loading,
      }
    }
  })),
);
