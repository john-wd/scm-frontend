import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './smashcustommusic/components/list/list.component';
import { RouterWrapperComponent } from './smashcustommusic/components/router-wrapper/router-wrapper.component';

const routes: Routes = [
  {
    path: 'gamelist',
    component: ListComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      { path: ':game_id', component: RouterWrapperComponent },
    ],
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
