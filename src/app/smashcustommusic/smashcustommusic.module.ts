import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ScmEffects } from './state/scm.effects';
import { ListComponent } from './components/list/list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ScmEffects]),
    HttpClientModule,
  ],
  exports: [ListComponent],
})
export class SmashcustommusicModule {}
