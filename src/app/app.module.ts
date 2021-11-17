import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http' ;
import { AppRoutingModule } from './app-routing.module';
import { OtherFunction } from './other/toast';
import { AuthInterceptor } from './interceptors/auth-interceptors';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule , IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ,OtherFunction],
  bootstrap: [AppComponent],
})
export class AppModule {}
