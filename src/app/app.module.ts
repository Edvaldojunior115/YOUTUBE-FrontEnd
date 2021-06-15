import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    RouterModule
  ],
  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
