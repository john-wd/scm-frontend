import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SmashcustommusicModule } from './smashcustommusic/smashcustommusic.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';

import { FeatureFlagService } from './shared/services/feature-flag.service';

import * as flagConfigs from "./config/production.flags.json";

const featureFlagFactory = (featureFlagService: FeatureFlagService) => () => featureFlagService.loadConfig(flagConfigs)
@NgModule({
    declarations: [AppComponent],
    imports: [
    BrowserModule,
    AppRoutingModule,
    SmashcustommusicModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: false, // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
    SidebarComponent, MainNavComponent,
],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: featureFlagFactory,
            deps: [FeatureFlagService],
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
