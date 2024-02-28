import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton, } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { EntrycardComponent } from 'src/app/shared/components/entrycard/entrycard.component';
import { GameList, Song } from 'src/app/smashcustommusic/models/scm.model';
import { mockGames } from './mockdata';
import { Entry, EntrycardContainerComponent } from 'src/app/shared/components/entrycard-container/entrycard-container.component';
import { FeatureFlagDirective } from 'src/app/shared/directives/feature-flag.directive';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
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

  constructor() { }

  ngOnInit(): void {
    // TODO: remove these mocks
    this.recentlyPlayed$ = of(mockGames).pipe(map(list => list.map(e => {
      return {
        entryId: e.game_id.toString(),
        imageUrl: e.thumbnail_url,
        title: e.game_name,
      } as Entry
    })
    ))
    this.popularGames$ = of(mockGames).pipe(map(list => list.map(e => {
      return {
        entryId: e.game_id.toString(),
        imageUrl: e.thumbnail_url,
        title: e.game_name,
      } as Entry
    })))
    this.playlists$ = of([{
      entryId: "playlist1",
      title: "Playlist 1",
      imageUrl: "",
    }, {
      entryId: "playlist2",
      title: "Playlist 2",
      imageUrl: "",
    }] as Entry[])
  }

}
