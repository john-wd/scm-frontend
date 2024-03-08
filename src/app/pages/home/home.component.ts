import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton, } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Entry, EntrycardContainerComponent } from 'src/app/shared/components/entrycard-container/entrycard-container.component';
import { FeatureFlagDirective } from 'src/app/shared/directives/feature-flag.directive';
import { getGamelistEntity } from 'src/app/state/scm/scm.selector';
import * as fromActions from '../../state/scm/scm.actions';


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
        return games
          .slice()
          .sort((a, b) => b.song_count - a.song_count)
          .slice(0, nGamesShown).map(g => ({
            entryId: g.game_id.toString(),
            imageUrl: g.thumbnail_url,
            title: g.game_name,
          } as Entry))
      }),
    )
  }

}
