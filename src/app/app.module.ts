import { FormsModule } from '@angular/forms';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import {AppRoutingModule} from "./app-routing.module";
import { MessageService } from 'primeng/api';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { ConfigService } from './services/config/config.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { 

}
  function initializeApp(config: ConfigService) {
    return () => config.loadPromise().then(() => {
      console.log('---CONFIG LOADED--', ConfigService.config)
    });
  }