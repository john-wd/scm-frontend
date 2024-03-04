import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton, } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { EntrycardComponent } from 'src/app/shared/components/entrycard/entrycard.component';
import { GameList, Song } from 'src/app/models/scm.model';
import { mockGames } from './mockdata';
import { Entry, EntrycardContainerComponent } from 'src/app/shared/components/entrycard-container/entrycard-container.component';
import { FeatureFlagDirective } from 'src/app/shared/directives/feature-flag.directive';
import { Store } from '@ngrx/store';
import * as fromActions from '../../state/scm/scm.actions';
import { getGamelistEntity } from 'src/app/state/scm/scm.selector';


const nGamesShown = 10;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    EntrycardContainerComponent,
    MatButton,
    MatIcon,
    RouterLink,
    FeatureFlagDirective,
  ]
})
export class HomeComponent implements OnInit {
  recentlyPlayed$: Observable<Entry[]>
  popularGames$: Observable<Entry[]>
  playlists$: Observable<Entry[]>

  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromActions.fetchGamelist.action());
    this.popularGames$ = this.store.select(getGamelistEntity).pipe(
      map(games => {
        return games.slice(0, nGamesShown).map(g => ({
          entryId: g.game_id.toString(),
          imageUrl: g.thumbnail_url,
          title: g.game_name,
        } as Entry))
      }),
    )
  }

}
