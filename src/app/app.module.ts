import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SmashcustommusicModule } from './smashcustommusic/smashcustommusic.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, SidebarComponent, MainNavComponent],
  imports: [
    BrowserModule,
    SharedModule,
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
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
