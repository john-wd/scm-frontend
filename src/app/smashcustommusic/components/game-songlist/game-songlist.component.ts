import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { SongList } from '../../models/scm.model';
import { LoadingService } from '../../services/loading.service';
import { fetchSonglist } from '../../state/scm.actions';
import { getSonglist } from '../../state/scm.selector';

@Component({
  selector: 'app-game-songlist',
  templateUrl: './game-songlist.component.html',
  styleUrls: ['./game-songlist.component.sass'],
})
export class GameSonglistComponent implements OnInit, OnDestroy {
  @Input('gameId')
  gameId: number;

  songlist$: Observable<SongList.Root>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  songs$: Observable<SongList.Entry[]>;

  columsToDisplay: string[] = ['game_name', 'song_count'];
  dataSource = new MatTableDataSource<any>();

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchSonglist.action({ gameId: this.gameId }));
    this.songlist$ = this.store
      .select(getSonglist)
      .pipe(map((state) => state[this.gameId]));
    this.songs$ = this.songlist$.pipe(map((list) => (list ? list.songs : [])));
    this.loading$ = this.loadingService.loading$;
    this.loaded$ = this.loadingService.loaded$;

    this.subscriptions.push(
      this.songs$.subscribe((songs) => {
        this.dataSource.data = songs;
      })
    );
  }

  ngOnDestroy(): void {}
}
