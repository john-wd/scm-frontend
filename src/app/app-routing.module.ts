import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { GamelistComponent } from './pages/gamelist/gamelist.component';
import { SonglistComponent } from './pages/songlist/songlist.component';
import { HelpComponent } from './components/help/help.component';
import { BrowseSeriesComponent } from './pages/browse-series/browse-series.component';
import { BrowseConsolesComponent } from './pages/browse-consoles/browse-consoles.component';

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
    path: 'explore/series',
    component: BrowseSeriesComponent,
  },
  {
    path: 'explore/consoles',
    component: BrowseConsolesComponent,
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
