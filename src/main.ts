import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';

import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, RouteReuseStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { PlayerService } from './app/services/player.service';
import { ScmApiService } from './app/services/scm-api.service';
import { FeatureFlagService } from './app/shared/services/feature-flag.service';
import { SmashCustomMusicStateModule } from './app/state/scm/scm.module';
import config from "./config/production.config.json";
import { routes } from './routes';

const featureFlagFactory = (featureFlagService: FeatureFlagService) => () => featureFlagService.loadConfig(config.flags)
const apiServiceFactory = (apiService: ScmApiService) => () => {
  apiService.configure(config.api_url)
}
const playerServiceFactory = (playerService: PlayerService) => () => {
  playerService.configure(config.song_url)
}

class ReloadRouterStrategy extends BaseRouteReuseStrategy {
  constructor() {
    super()
  }
  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean { return false }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
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
    {
      provide: RouteReuseStrategy,
      useClass: ReloadRouterStrategy,
    },
    provideAnimations(),
    provideRouter(
      routes,
      withComponentInputBinding()
    )
  ]
})
  .catch(err => console.error(err));
