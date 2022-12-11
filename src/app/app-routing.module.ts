import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './smashcustommusic/components/list/list.component';
import { RouterWrapperComponent } from './smashcustommusic/components/router-wrapper/router-wrapper.component';

const routes: Routes = [
  { path: 'gamelist', component: ListComponent },
  { path: 'gamelist/:game_id', component: RouterWrapperComponent },
  { path: '', redirectTo: '/gamelist', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
