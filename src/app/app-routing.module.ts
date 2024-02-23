import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { GamelistComponent } from './smashcustommusic/components/gamelist/gamelist.component';
import { SonglistComponent } from './smashcustommusic/components/songlist/songlist.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  {
    path: "explore",
    redirectTo: "explore/games",
    pathMatch: "full"
  },
  {
    path: 'explore/games',
    component: GamelistComponent,
  },
  {
    path: "explore/games/:gameId",
    component: SonglistComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: "home",
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
