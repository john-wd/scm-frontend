import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SmashcustommusicModule } from './app/smashcustommusic/smashcustommusic.module';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FeatureFlagService } from './app/shared/services/feature-flag.service';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';

import config from "./config/production.config.json";
import { ScmApiService } from './app/smashcustommusic/services/scm-api.service';
import { PlayerService } from './app/smashcustommusic/services/player.service';

const featureFlagFactory = (featureFlagService: FeatureFlagService) => () => featureFlagService.loadConfig(config.flags)
const apiServiceFactory = (apiService: ScmApiService) => () => {
  apiService.configure(config.api_url)
}
const playerServiceFactory = (playerService: PlayerService) => () => {
  playerService.configure(config.song_url)
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, SmashcustommusicModule, StoreModule.forRoot({}), EffectsModule.forRoot(), StoreDevtoolsModule.instrument({
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
