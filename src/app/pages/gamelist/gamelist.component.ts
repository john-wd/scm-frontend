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
import { NgIf, AsyncPipe } from '@angular/common';
import { getGamelistEntity, getGamelistUIState } from 'src/app/state/scm/scm.selector';


type scrollState = {
  limit: number;
  offset: number;
}
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
  scrollStateSubj = new BehaviorSubject<scrollState>({ limit: 200, offset: 0 })

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
            map((games) => games.slice(st.offset, st.offset + st.limit)),
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

  // applyFilter(event: Event) {
  //   if (this.dataSource) {
  //     const filterValue = (event.target as HTMLInputElement).value;
  //     this.dataSource.filter = filterValue.trim().toLowerCase();
  //   }
  // }

  private _scrollState = {
    limit: 50,
    offset: 0
  }

  get scrollState(): scrollState {
    return this._scrollState
  }
  set scrollState(st: scrollState) {
    this._scrollState = st
    this.scrollStateSubj.next(st)
  }

  onTableScroll(e: any): void {
    console.log("scroll")
    const tableViewHeight = e.target.offsetHeight // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const scrollThreshold = 200;

    const scrollUpLimit = scrollThreshold;
    if (scrollLocation < scrollUpLimit && this.scrollState.offset > 0) {
      this.scrollState = {
        ...this.scrollState,
        offset: this.scrollState.offset -= this.scrollState.limit
      }
      this.scrollTo(tableScrollHeight / 2 - 2 * tableViewHeight);
    }

    const scrollDownLimit = tableScrollHeight - tableViewHeight - scrollThreshold;
    if (scrollLocation > scrollDownLimit) {
      this.scrollState.offset += this.scrollState.limit
      this.scrollState = {
        ...this.scrollState,
        offset: this.scrollState.offset += this.scrollState.limit
      }
      this.scrollTo(tableScrollHeight / 2 + 2 * tableViewHeight);
    }
  }

  private scrollTo(position: number): void {
    this.renderer.setProperty(this.matTableRef.nativeElement, 'scrollTop', position);
  }

}
