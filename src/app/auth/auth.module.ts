import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LayoutHttpInterceptor} from '../interceptor/layout-http.interceptor';
import {AuthInterceptor} from '../interceptor/auth.interceptor';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule
  ],
  declarations: [AuthComponent],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AuthModule {}
