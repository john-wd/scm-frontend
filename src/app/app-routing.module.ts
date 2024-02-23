import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { GamelistComponent } from './smashcustommusic/components/gamelist/gamelist.component';
import { SonglistComponent } from './smashcustommusic/components/songlist/songlist.component';

const routes: Routes = [
  {
    path: 'gamelist',
    component: GamelistComponent,
  },
  {
    path: "gamelist/:gameId",
    component: SonglistComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
