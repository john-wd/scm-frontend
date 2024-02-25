import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton, } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EntrycardComponent } from 'src/app/shared/components/entrycard/entrycard.component';
import { GameList, Song } from 'src/app/smashcustommusic/models/scm.model';
import { mockGames } from './mockdata';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    EntrycardComponent,
    MatButton,
    MatIcon,
    RouterLink,
  ]
})
export class HomeComponent implements OnInit {
  recentlyPlayed$: Observable<GameList.Entry[]>
  popularGames$: Observable<GameList.Entry[]>

  constructor() { }

  ngOnInit(): void {
    // TODO: remove these mocks
    this.recentlyPlayed$ = of(mockGames)
    this.popularGames$ = of(mockGames)
  }

}
