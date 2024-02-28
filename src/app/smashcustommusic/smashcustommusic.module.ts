import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './state/scm.effects';
import { GamelistComponent } from '../pages/gamelist/gamelist.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { scmFeatureKey, scmReducer } from './state/scm.reducer';

import { SonglistComponent } from '../pages/songlist/songlist.component';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from '../components/player/player.component';
import { NgxFilesizeModule } from 'ngx-filesize';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(scmFeatureKey, scmReducer),
        EffectsModule.forFeature([ScmEffects]),
        HttpClientModule,
        RouterModule,
        NgxFilesizeModule,
        GamelistComponent,
        SonglistComponent,
        PlayerComponent,
    ],
    exports: [GamelistComponent, PlayerComponent],
})
export class SmashcustommusicModule { }
