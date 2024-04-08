import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { ShareModal } from 'src/app/components/share-modal/share-modal.component';
import { getSonglistEntityById, getSonglistUIState } from 'src/app/state/scm/scm.selector';
import { Song, Songlist } from '../../models/scm.model';
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
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDivider,
    DatePipe,
  ],
})
export class SonglistComponent implements OnInit, OnDestroy {
  gameId: number;
  @ViewChild('gameName') gameName: ElementRef;
  description: string;

  songlist$: Observable<Songlist>;
  loaded$: Observable<boolean>;

  songs: Song[] = [];
  bannerExists: boolean;
  song_count: number;

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
    this.songlist$ = this.store.select(getSonglistEntityById(gameId))
    let songs$ = this.songlist$.pipe(map((list) => {
      if (!list) return []
      return list.songs || []
    }));

    this.loaded$ = this.store
      .select(getSonglistUIState)
      .pipe(map((state) => state.loaded));

    this.subscriptions.push(
      songs$.subscribe((songs) => {
        this.songs = songs;
      }),
    );
    this.gameId = gameId
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onPlay(song: Song) {
    this.playerService.play(song);
    // this.playerService.play({
    //   ...song,
    //   game_id: String(this.gameId),
    //   game_name: this.gameName.nativeElement.textContent,
    // } as Song);
  }

  onAddToPlaylist(song: Song) {
    console.log(song)
    this.playerService.addToPlaylist(song);
  }

  onPlayAll(shuffle = false) {
    this.playerService.clearPlaylist()
    this.onAddAllToPlaylist(shuffle)
    this.playerService.playAtIndex(0)
  }

  onAddAllToPlaylist(shuffle = false) {
    let songs = this.songs.slice()
    if (shuffle)
      songs = shuffleArray(songs)

    songs.forEach((s: Song) => {
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

  openSongShareDialog(song: Song) {
    let details = templateStr`From ${"game_name"}, length ${"length"}. ${"downloads"} downloads`
    const datePipe = new DatePipe('en-US');
    this.dialog.open(ShareModal, {
      data: {
        resourceType: "song",
        resourceId: song.song_id,
        title: song.song_name,
        description: details({
          game_name: this.gameName.nativeElement.textContent,
          length: datePipe.transform(song.length, "mm 'minutes and' ss 'seconds'"),
          downloads: song.downloads
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

