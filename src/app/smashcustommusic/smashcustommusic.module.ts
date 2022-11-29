import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './state/scm.effects';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, EffectsModule.forFeature([ScmEffects])],
  exports: [ListComponent],
})
export class SmashcustommusicModule {}
