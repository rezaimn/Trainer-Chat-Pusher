import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpService} from './shared/services/http.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ModalModule} from 'ngx-bootstrap';
import {DeleteConfirmationModalComponent} from './shared/components/delete-confirmation-modal/delete-confirmation-modal.component';
import {EventEmitterService} from './shared/services/event-emitter.service';
import {AlertMessageService} from './shared/services/alert-message.service';
import {DataService} from './shared/services/data.service';


export const createTranslateLoader = (http: HttpClient) => {

  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    DeleteConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxWebstorageModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    HttpService,
    EventEmitterService,
    AlertMessageService,
    DataService
  ],
  entryComponents:[DeleteConfirmationModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
