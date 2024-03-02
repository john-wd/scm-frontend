import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, fromEvent, map, Observable, Subscription, switchMap, } from 'rxjs';
import { GameList } from '../../models/scm.model';
import { LoadingService } from '../../shared/services/loading.service';
import * as fromActions from '../../state/scm/scm.actions';
import { RouterLink } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuContent } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { FeatureFlagDirective } from '../../shared/directives/feature-flag.directive';
import { NgIf, AsyncPipe, NgFor, NgClass } from '@angular/common';
import { getGamelistEntity, getGamelistUIState } from 'src/app/state/scm/scm.selector';


type tableState = {
  limit: number;
  offset: number;
  startsWith?: string;
}
@Component({
  selector: 'scm-list',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.sass'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
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

  initials = "#ABCDEFGHIJKLMNOPQRSTUVWYXZ"
  columsToDisplay: string[] = [
    'game_name',
    'song_count',
    'menu'
  ];
  dataSource = new MatTableDataSource<any>();
  scrollStateSubj = new BehaviorSubject<tableState>({ limit: 200, offset: 0 })
  private _tableState = {
    limit: 200,
    offset: 0
  }
  get tableState(): tableState {
    return this._tableState
  }
  set tableState(st: tableState) {
    this._tableState = st
    this.scrollStateSubj.next(st)
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.fetchGamelist.action());
    this.gamelist$ = this.store.select(getGamelistEntity);
    this.loaded$ = this.store.select(getGamelistUIState).pipe(map(s => s.loaded));
    this.loading$ = this.store.select(getGamelistUIState).pipe(map(s => s.loading));

    this.subscriptions.push(
      this.scrollStateSubj.asObservable().pipe(
        switchMap(st => {
          return this.gamelist$.pipe(
            map((games) => {
              let filtered = games
                .filter(g => {
                  if (!st.startsWith)
                    return true

                  let regexpStr = st.startsWith
                  if (regexpStr === "#")
                    regexpStr = "[0-9]"

                  let regexp = new RegExp("^" + regexpStr)
                  return regexp.test(g.game_name)
                })
              if (st.offset < 0)
                st.offset = 0
              if (st.offset > filtered.length) {
                st.offset = filtered.length - st.limit
              }
              this._tableState = st

              return filtered.slice(st.offset, st.offset + st.limit)
            }),
          )
        })).subscribe(games => {
          this.dataSource.data = games
        })
    )
  }

  @ViewChild('table', { read: ElementRef }) public matTableRef: ElementRef;
  public ngAfterViewInit(): void {
    fromEvent(this.matTableRef.nativeElement, 'scroll')
      .pipe(debounceTime(5000))
      .subscribe((e: any) => this.onTableScroll(e));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  // private sort: MatSort;
  // @ViewChild(MatSort) set matMatSort(ms: MatSort) {
  //   this.sort = ms;
  //   this.dataSource.sort = this.sort;
  // }

  filter(letter: string) {
    if (letter === this.tableState.startsWith) {
      this.tableState = {
        ...this.tableState,
        offset: 0,
        startsWith: undefined
      }
      return
    }

    this.tableState = {
      ...this.tableState,
      offset: 0,
      startsWith: letter,
    }
  }

  onTableScroll(e: any): void {
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    console.log(tableViewHeight, tableScrollHeight, scrollLocation)
    // If the user has scrolled within 20px of the bottom, add more data
    const scrollThreshold = 20;

    const scrollUpLimit = scrollThreshold;
    if (scrollLocation < scrollUpLimit && this.tableState.offset > 0) {
      this.tableState = {
        ...this.tableState,
        offset: this.tableState.offset -= this.tableState.limit
      }
      this.scrollTo(tableScrollHeight / 2 + 2 * tableViewHeight);
    }

    const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
    if (scrollLocation > scrollDownLimit) {
      this.tableState.offset += this.tableState.limit
      this.tableState = {
        ...this.tableState,
        offset: this.tableState.offset += this.tableState.limit
      }
      this.scrollTo(tableScrollHeight / 2 + tableViewHeight);
    }
  }

  private scrollTo(position: number): void {
    this.renderer.setProperty(this.matTableRef.nativeElement, 'scrollTop', position);
  }

}
