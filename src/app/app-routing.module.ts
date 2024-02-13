import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { MainComponent } from './components/main/main.component';
import { RouterWrapperComponent } from './components/router-wrapper/router-wrapper.component';

const routes: Routes = [
  {
    path: 'gamelist',
    component: MainComponent,
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
