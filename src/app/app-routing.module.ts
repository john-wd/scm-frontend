import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { GamelistComponent } from './smashcustommusic/components/gamelist/gamelist.component';
import { RouterWrapperComponent } from './smashcustommusic/components/router-wrapper/router-wrapper.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';

const routes: Routes = [
  {
    path: 'gamelist',
    component: GamelistComponent,
  },
  {
    path: "gamelist/:game_id",
    component: RouterWrapperComponent
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
