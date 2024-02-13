import { DataSource } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, ReplaySubject, Subscription, tap } from 'rxjs';
import { GameList } from '../../smashcustommusic/models/scm.model';
import { LoadingService } from '../../smashcustommusic/services/loading.service';
import { ScmApiService } from '../../smashcustommusic/services/scm-api.service';
import * as fromActions from '../../smashcustommusic/state/scm.actions';
import { getGamelist } from '../../smashcustommusic/state/scm.selector';

@Component({
  selector: 'scm-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit, OnDestroy {
  gamelist$: Observable<GameList.Root>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  games$: Observable<GameList.Entry[]>;

  columsToDisplay: string[] = ['game_name', 'song_count'];
  dataSource = new MatTableDataSource<any>();

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.fetchGamelist.action());
    this.gamelist$ = this.store.select(getGamelist);
    this.games$ = this.gamelist$.pipe(map((list) => (list ? list.games : [])));
    this.loading$ = this.loadingService.loading$;
    this.loaded$ = this.loadingService.loaded$;

    this.subscriptions.push(
      this.games$.subscribe((games) => {
        this.dataSource.data = games;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
  }

  private sort: MatSort;
  @ViewChild(MatSort) set matMatSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    if (this.dataSource) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  onRowClicked(row: any) {
    this.router.navigate(['./', row.game_id], {
      relativeTo: this.route,
    });
  }
}
