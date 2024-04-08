import { createAction, props } from '@ngrx/store';
import { Gamelist, SongDetails, Songlist } from '../../models/scm.model';

export const setLoading = createAction("Set loaded status", props<{ loading: boolean, page: string }>())

export namespace fetchGamelist {
  const tag = '[Game List]';

  export const action = createAction(`${tag} Fetch game list`);

  export const success = createAction(
    `${tag} Fetch game list success`,
    props<{ gamelist: Gamelist }>()
  );

  export const error = createAction(
    `${tag} Fetch game list error`,
    props<{ error: string }>()
  );
}

export namespace fetchSonglist {
  const tag = '[Song List]';

  export const action = createAction(
    `${tag} Fetch song list`,
    props<{ gameId: number }>()
  );

  export const success = createAction(
    `${tag} Fetch song list success`,
    props<{ songlist: Songlist }>()
  );

  export const error = createAction(
    `${tag} Fetch song list error`,
    props<{ error: string }>()
  );
}

export namespace fetchSongDetails {
  const tag = '[Song Details]';

  export const action = createAction(
    `${tag} Fetch song details`,
    props<{ songId: number }>()
  );

  export const success = createAction(
    `${tag} Fetch song details success`,
    props<{ song: SongDetails }>()
  );

  export const error = createAction(
    `${tag} Fetch song details error`,
    props<{ error: string }>()
  );
}

export namespace meta {
  const tag = '[Meta]';

  export const reset = createAction(`${tag} Reset state`);
}
