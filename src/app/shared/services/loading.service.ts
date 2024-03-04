import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { State } from '../../state/scm/scm.reducer';
import { getState } from 'src/app/state/scm/scm.selector';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$: Observable<boolean>;
  lastError$: Observable<string | null | undefined>;

  constructor(private store: Store<State>) {
    this.loading$ = store.select(getState)
      .pipe(map((state) => {
        let allStates = Object.keys(state.ui.pages).map(k => {
          if ((state.ui.pages as any)[k].loading)
            return true
          return false
        })
        return allStates.some(v => v)
      }));
  }
}
