import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatRow, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { ShareModal } from 'src/app/components/share-modal/share-modal.component';
import { getSonglistEntityById, getSonglistUIState } from 'src/app/state/scm/scm.selector';
import { Song, SongList } from '../../models/scm.model';
import { PlayerService } from '../../services/player.service';
import { FormatBRSTM, ScmApiService } from '../../services/scm-api.service';
import { templateStr } from "../../shared/utils/template";
import { fetchSonglist } from '../../state/scm/scm.actions';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatFabButton,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatRowDef,
    MatRow,
    MatRipple,
    MatMenu,
    MatMenuContent,
    MatMenuItem,
    MatDivider,
    AsyncPipe,
    DatePipe,
  ],
})
export class SonglistComponent implements OnInit, OnDestroy {
  gameId: number;
  @ViewChild('gameName') gameName: ElementRef;
  description: string;

  songlist$: Observable<SongList.Root>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  songs$: Observable<SongList.Entry[]>;

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
    private route: ActivatedRoute,
    private store: Store<any>,
    private scmApi: ScmApiService,
    private playerService: PlayerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('gameId'));
    this.store.dispatch(fetchSonglist.action({ gameId: gameId }));
    this.songlist$ = this.store
      .select(getSonglistEntityById(gameId))
    this.songs$ = this.songlist$.pipe(map((list) => (list ? list.songs : [])));

    this.loading$ = this.store
      .select(getSonglistUIState)
      .pipe(map((state) => state.loading));
    this.loaded$ = this.store
      .select(getSonglistUIState)
      .pipe(map((state) => state.loaded));

    this.subscriptions.push(
      this.songs$.subscribe((songs) => {
        this.dataSource.data = songs;
      })
    );
    this.gameId = gameId
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

  onPlay(song: SongList.Entry) {
    this.playerService.play({
      name: song.song_name,
      song_id: song.song_id,
      game_id: String(this.gameId),
      game_name: this.gameName.nativeElement.textContent,
      uploader: song.song_uploader,
      length: Number(song.song_length) * 1e3,
      downloads: song.song_downloads,
      available: song.song_available,
      loop_type: song.song_loop,
    } as Song);
  }

  onAddToPlaylist(song: SongList.Entry) {
    this.playerService.addToPlaylist({
      name: song.song_name,
      song_id: song.song_id,
      game_id: String(this.gameId),
      game_name: this.gameName.nativeElement.textContent,
      uploader: song.song_uploader,
      length: Number(song.song_length) * 1e3,
      downloads: song.song_downloads,
      available: song.song_available,
      loop_type: song.song_loop,
    } as Song);
  }

  onPlayAll(shuffle = false) {
    this.playerService.clearPlaylist()
    this.onAddAllToPlaylist(shuffle)
    this.playerService.playAtIndex(0)
  }

  onAddAllToPlaylist(shuffle = false) {
    let songs = this.dataSource.data.slice()
    if (shuffle)
      songs = shuffleArray(songs)

    songs.forEach((s: SongList.Entry) => {
      this.onAddToPlaylist(s)
    })
  }

  onDownload(song: Song) {
    this.scmApi.downloadSong(FormatBRSTM, song)
  }

  bannerUrl(gameId: number): string {
    return this.scmApi.getBannerUrl(gameId);
  }

  openGameShareDialog() {
    this.dialog.open(ShareModal, {
      data: {
        resourceType: "game",
        resourceId: this.gameId,
        title: this.gameName.nativeElement.textContent,
      }
    })
  }

  openSongShareDialog(song: SongList.Entry) {
    let details = templateStr`From ${"game_name"}, length ${"length"}. ${"downloads"} downloads`
    const datePipe = new DatePipe('en-US');
    this.dialog.open(ShareModal, {
      data: {
        resourceType: "song",
        resourceId: song.song_id,
        title: song.song_name,
        description: details({
          game_name: this.gameName.nativeElement.textContent,
          length: datePipe.transform(song.song_length * 1e3, "mm 'minutes and' ss 'seconds'"),
          downloads: song.song_downloads
        })
      }
    })
  }
}

function shuffleArray(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

