import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './scm.effects';
import { StoreModule } from '@ngrx/store';
import { scmFeatureKey, scmReducer } from './scm.reducer';


@NgModule({
  imports: [
    StoreModule.forFeature(scmFeatureKey, scmReducer),
    EffectsModule.forFeature([ScmEffects]),
  ],
  exports: [],
})
export class SmashCustomMusicStateModule { }
