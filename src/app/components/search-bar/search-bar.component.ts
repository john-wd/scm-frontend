import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Subscription, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { GameList } from 'src/app/models/scm.model';
import { State } from 'src/app/state/scm/scm.reducer';
import { getState } from 'src/app/state/scm/scm.selector';
import * as fromActions from '../../state/scm/scm.actions';

const queryThrottleTime = 700 // ms
const minQueryLength = 3

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnDestroy {
  query: string;
  querySubj = new Subject<string>()
  isFocused: boolean = false

  results: GameList.Entry[]
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<State>,
    private eRef: ElementRef
  ) {
    this.store.dispatch(fromActions.fetchGamelist.action());
    this.subscriptions.push(
      this.querySubj.asObservable().pipe(
        debounceTime(queryThrottleTime),
        distinctUntilChanged(),
        filter(query => query.length >= minQueryLength),
        switchMap(query => {
          return this.store.select(getState).pipe(
            map(state => {
              return state.entities.games
                .filter(el => {
                  return normalizeText(el.game_name).includes(query.toLowerCase())
                })
            })
          )
        })
      ).subscribe(results => {
        this.results = results
      }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ontype() {
    if (this.query.length < minQueryLength) {
      this.results = []
    }
    this.querySubj.next(this.query)
  }

  focus() {
    this.isFocused = true
  }
  @HostListener('document:click', ['$event'])
  blur(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target))
      this.hide()
  }
  hide() {
    this.isFocused = false;
  }
}


function normalizeText(text: string): string {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase()
}
