import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Song, SongList } from '../../models/scm.model';
import { LoadingService } from '../../services/loading.service';
import { PlayerService } from '../../services/player.service';
import { ScmApiService } from '../../services/scm-api.service';
import { fetchSongDetails, fetchSonglist } from '../../state/scm.actions';
import { getSonglist, getSelection } from '../../state/scm.selector';
import { MatDialog } from '@angular/material/dialog';
import { SongDetailsModal } from '../song-details-modal/song-details-modal.component';

@Component({
  selector: 'app-game-songlist',
  templateUrl: './game-songlist.component.html',
  styleUrls: ['./game-songlist.component.sass'],
})
export class GameSonglistComponent implements OnInit, OnDestroy {
  @Input('gameId') gameId: number;
  @ViewChild('gameName') gameName: ElementRef;
  description: string;

  songlist$: Observable<SongList.Root>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  songs$: Observable<SongList.Entry[]>;

  selectedSongId: number;
  selectedSong$: Observable<Song>;

  columsToDisplay: string[] = [
    'index',
    'song_name',
    'game_name',
    'song_uploader',
    'song_length',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<any>,
    private loadingService: LoadingService,
    private scmApi: ScmApiService,
    private playerService: PlayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fetchSonglist.action({ gameId: this.gameId }));
    this.songlist$ = this.store
      .select(getSonglist)
      .pipe(map((state) => state[this.gameId]));
    this.selectedSong$ = this.store
      .select(getSelection)
      .pipe(map((state: any) => state[this.selectedSongId]));
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
  onRowClicked(row: Song) {
    this.selectedSongId = row.song_id;
    this.store.dispatch(fetchSongDetails.action({ songId: row.song_id }));
  }

  onPlay(song: SongList.Entry) {
    this.playerService.play({
      name: song.song_name,
      game_id: String(this.gameId),
      song_id: song.song_id,
      game_name: this.gameName.nativeElement.textContent,
      uploader: song.song_uploader,
    } as Song);
  }

  onAddToPlaylist(song: SongList.Entry) {
    this.playerService.addToPlaylist({
      name: song.song_name,
      song_id: song.song_id,
      game_id: String(this.gameId),
      game_name: this.gameName.nativeElement.textContent,
      uploader: song.song_uploader,
    } as Song);
  }

  bannerUrl(gameId: number): string {
    return this.scmApi.getBannerUrl(gameId);
  }

  openDetails(song: Song) {
    this.dialog.open(SongDetailsModal, {
      data: song,
    })
  }
}
