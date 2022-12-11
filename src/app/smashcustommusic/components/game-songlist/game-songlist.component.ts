import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Sanitizer,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { SongList } from '../../models/scm.model';
import { LoadingService } from '../../services/loading.service';
import { ScmApiService } from '../../services/scm-api.service';
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

  columsToDisplay: string[] = [
    'song_name',
    'song_length',
    'song_loop',
    'song_uploader',
    'song_downloads',
  ];
  dataSource = new MatTableDataSource<any>();

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private loadingService: LoadingService,
    private scmApi: ScmApiService,
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private paginator: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
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

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  onRowClicked(row: any) {
    console.log(row);
  }

  bannerUrl(gameId: number): string {
    return this.scmApi.getBannerUrl(gameId);
  }
}
