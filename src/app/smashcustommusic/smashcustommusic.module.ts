import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './state/scm.effects';
import { ListComponent } from './components/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { scmFeatureKey, scmReducer } from './state/scm.reducer';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(scmFeatureKey, scmReducer),
    EffectsModule.forFeature([ScmEffects]),
    HttpClientModule,
  ],
  exports: [ListComponent],
})
export class SmashcustommusicModule {}
