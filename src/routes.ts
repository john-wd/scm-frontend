import { Routes } from "@angular/router";
import { RouteWrapperComponent } from "./app/components/route-wrapper/route-wrapper.component";
import { AboutComponent } from "./app/pages/about/about.component";
import { BrowseConsolesComponent } from "./app/pages/browse-consoles/browse-consoles.component";
import { BrowseSeriesComponent } from "./app/pages/browse-series/browse-series.component";
import { GamelistComponent } from "./app/pages/gamelist/gamelist.component";
import { HelpComponent } from "./app/pages/help/help.component";
import { HomeComponent } from "./app/pages/home/home.component";
import { SongDetailsModal } from "./app/pages/song-details-modal/song-details-modal.component";
import { SonglistComponent } from "./app/pages/songlist/songlist.component";

export const routes: Routes = [
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
    path: "explore/songs/:routeId",
    component: RouteWrapperComponent<SongDetailsModal>,
    data: {
      component: SongDetailsModal
    }
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
