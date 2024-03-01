import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, } from 'rxjs';
import { GameList } from '../../models/scm.model';
import { LoadingService } from '../../shared/services/loading.service';
import * as fromActions from '../../state/scm/scm.actions';
import { RouterLink } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuContent } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { FeatureFlagDirective } from '../../shared/directives/feature-flag.directive';
import { NgIf, AsyncPipe } from '@angular/common';
import { getGamelistEntity, getGamelistUIState } from 'src/app/state/scm/scm.selector';

@Component({
  selector: 'scm-list',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.sass'],
  standalone: true,
  imports: [
    NgIf,
    MatTable,
    MatSort,
    FeatureFlagDirective,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatRipple,
    RouterLink,
    MatMenu,
    MatMenuContent,
    AsyncPipe,
  ],
})
export class GamelistComponent implements OnInit, OnDestroy {
  gamelist$: Observable<GameList.Entry[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean | undefined>;

  columsToDisplay: string[] = [
    'game_name',
    'song_count',
    'menu'
  ];
  dataSource = new MatTableDataSource<any>();

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.fetchGamelist.action());
    this.gamelist$ = this.store.select(getGamelistEntity);
    this.loaded$ = this.store.select(getGamelistUIState).pipe(map(s => s.loaded));
    this.loading$ = this.store.select(getGamelistUIState).pipe(map(s => s.loading));

    this.subscriptions.push(
      this.gamelist$.subscribe((games) => {
        this.dataSource.data = games;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
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
    }
  }
}
