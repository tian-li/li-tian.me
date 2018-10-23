import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogModule } from './blog/blog.module';
import { reducers } from './blog/reducer';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    BlogModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, SideNavComponent, AboutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
