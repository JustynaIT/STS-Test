import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BeerService } from './services/beer.service';
import { MainService } from './services/main.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';

import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { ListBeersComponent } from './components/list-beers/list-beers.component';
import { ButtonOptionsComponent } from './components/button-options/button-options.component';
import { OptionsDialogComponent } from './dialogs/options-dialog/options-dialog.component';
import { ImgDialogComponent } from './dialogs/img-dialog/img-dialog.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListBeersComponent,
    ButtonOptionsComponent,
    OptionsDialogComponent,
    ImgDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [BeerService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
