import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './smashcustommusic/components/list/list.component';
import { MainComponent } from './smashcustommusic/components/main/main.component';
import { RouterWrapperComponent } from './smashcustommusic/components/router-wrapper/router-wrapper.component';

const routes: Routes = [
  {
    path: 'gamelist',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          breadcrumb: {
            label: 'Game list',
          },
        },
      },
      { path: ':game_id', component: RouterWrapperComponent },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: {
      breadcrumb: {
        label: 'Home',
        info: { icon: 'home' },
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
