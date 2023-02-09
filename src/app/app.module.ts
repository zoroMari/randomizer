import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/components/header/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SavedListModule } from './pages/saved-list/saved-list.module';
import { NumbersModule } from './pages/numbers/numbers.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SavedListModule,
    NumbersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
