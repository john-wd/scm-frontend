import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, Subscription, switchMap, } from 'rxjs';
import { GameList } from '../../models/scm.model';
import * as fromActions from '../../state/scm/scm.actions';
import { RouterLink } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuContent } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import { FeatureFlagDirective } from '../../shared/directives/feature-flag.directive';
import { CommonModule } from '@angular/common';
import { getGamelistEntity, getGamelistUIState } from 'src/app/state/scm/scm.selector';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';


type tableState = {
  limit: number;
  offset: number;
  startsWith?: string;
}
@Component({
  selector: 'scm-list',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.scss'],
  standalone: true,
  imports: [
    CdkVirtualScrollViewport,
    ScrollingModule,
    MatTableModule,
    CommonModule,
    FeatureFlagDirective,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatRipple,
    RouterLink,
    MatMenu,
    MatMenuContent,
  ],
})
export class GamelistComponent implements OnInit, OnDestroy {
  gamelist$: Observable<GameList.Entry[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean | undefined>;
  data: GameList.Entry[]

  initials = "#ABCDEFGHIJKLMNOPQRSTUVWYXZ"
  filterStartsWith?: string
  filterSubj = new BehaviorSubject<string | undefined>("")

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
      this.filterSubj.asObservable().pipe(switchMap(letter => {
        return this.gamelist$.pipe(map(games => {
          return games.filter(g => {
            if (!letter)
              return true

            return g.game_name.startsWith(letter)
          })
        }))
      })).subscribe(games =>
        this.data = games
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private setFilterLetter(letter?: string) {
    this.filterStartsWith = letter
    this.filterSubj.next(letter)
  }
  filter(letter?: string) {
    if (letter === this.filterStartsWith) {
      letter = undefined
    }

    this.setFilterLetter(letter)
  }

  onScroll() { console.log("scrolled") }

}
