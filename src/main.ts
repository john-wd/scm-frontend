import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';

import config from "./config/production.config.json";
import { ScmApiService } from './app/services/scm-api.service';
import { PlayerService } from './app/services/player.service';
import { FeatureFlagService } from './app/shared/services/feature-flag.service';
import { scmFeatureKey, scmReducer } from './app/state/scm/scm.reducer';
import { ScmEffects } from './app/state/scm/scm.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SmashCustomMusicStateModule } from './app/state/scm/scm.module';

const featureFlagFactory = (featureFlagService: FeatureFlagService) => () => featureFlagService.loadConfig(config.flags)
const apiServiceFactory = (apiService: ScmApiService) => () => {
  apiService.configure(config.api_url)
}
const playerServiceFactory = (playerService: PlayerService) => () => {
  playerService.configure(config.song_url)
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      SmashCustomMusicStateModule,
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: false, // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      })),
    {
      provide: APP_INITIALIZER,
      useFactory: featureFlagFactory,
      deps: [FeatureFlagService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: playerServiceFactory,
      deps: [PlayerService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: apiServiceFactory,
      deps: [ScmApiService],
      multi: true
    },
    provideAnimations(),
  ]
})
  .catch(err => console.error(err));
