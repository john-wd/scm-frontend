import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { State } from '../../state/scm/scm.reducer';
import { getMeta } from '../../state/scm/scm.selector';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  lastError$: Observable<string | null | undefined>;

  constructor(private store: Store<State>) {
    this.loaded$ = store
      .select(getMeta)
      .pipe(map((meta) => (meta ? meta.loaded : false)));
    this.loading$ = store
      .select(getMeta)
      .pipe(map((meta) => (meta ? meta.loading : false)));
    this.lastError$ = store.select('meta').pipe(map((meta) => meta.last_error));
  }
}
