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

import * as flagConfigs from "./config/production.flags.json";

const featureFlagFactory = (featureFlagService: FeatureFlagService) => () => featureFlagService.loadConfig(flagConfigs)




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
    provideAnimations(),
  ]
})
  .catch(err => console.error(err));
