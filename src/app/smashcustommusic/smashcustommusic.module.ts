import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './state/scm.effects';
import { ListComponent } from './components/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { scmFeatureKey, scmReducer } from './state/scm.reducer';
import { MaterialModule } from '../material.module';
import { RouterWrapperComponent } from './components/router-wrapper/router-wrapper.component';
import { GameSonglistComponent } from './components/game-songlist/game-songlist.component';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { SongDetailsComponent } from './components/song-details/song-details.component';

@NgModule({
  declarations: [
    ListComponent,
    RouterWrapperComponent,
    GameSonglistComponent,
    PlayerComponent,
    SongDetailsComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(scmFeatureKey, scmReducer),
    EffectsModule.forFeature([ScmEffects]),
    HttpClientModule,
    MaterialModule,
    RouterModule,
    NgxFilesizeModule,
  ],
  exports: [ListComponent, PlayerComponent],
})
export class SmashcustommusicModule { }
