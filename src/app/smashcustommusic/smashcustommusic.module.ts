import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './state/scm.effects';
import { GamelistComponent } from './components/gamelist/gamelist.component';
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
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GamelistComponent,
    RouterWrapperComponent,
    GameSonglistComponent,
    PlayerComponent,
    SongDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(scmFeatureKey, scmReducer),
    EffectsModule.forFeature([ScmEffects]),
    HttpClientModule,
    MaterialModule,
    RouterModule,
    NgxFilesizeModule,
  ],
  exports: [GamelistComponent, PlayerComponent],
})
export class SmashcustommusicModule { }
