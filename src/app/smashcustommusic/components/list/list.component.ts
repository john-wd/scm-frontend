import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { GameList } from '../../models/scm.model';
import { LoadingService } from '../../services/loading.service';
import { ScmApiService } from '../../services/scm-api.service';
import * as fromActions from '../../state/scm.actions';
import { getGamelist } from '../../state/scm.selector';

@Component({
  selector: 'scm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit {
  gamelist$: Observable<GameList.Root>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  games$: Observable<GameList.Entry[]>;

  constructor(
    private store: Store<any>,
    private loadingService: LoadingService,
    public api: ScmApiService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromActions.fetchGamelist.action());
    this.gamelist$ = this.store.select(getGamelist);
    this.games$ = this.gamelist$.pipe(map((list) => (list ? list.games : [])));
    this.loading$ = this.loadingService.loading$;
    this.loaded$ = this.loadingService.loaded$;
  }
}
