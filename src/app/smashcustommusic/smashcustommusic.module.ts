import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './state/scm.effects';
import { GamelistComponent } from './components/gamelist/gamelist.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { scmFeatureKey, scmReducer } from './state/scm.reducer';
import { MaterialModule } from '../material.module';
import { SonglistComponent } from './components/songlist/songlist.component';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GamelistComponent,
    SonglistComponent,
    PlayerComponent,
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
