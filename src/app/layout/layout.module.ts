import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';

import {SharedModule} from '../shared/modules/shared.module';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {HeaderComponent} from './shared/header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LayoutHttpInterceptor} from '../interceptor/layout-http.interceptor';
import {TranslateModule} from '@ngx-translate/core';
import {FooterComponent} from './shared/footer/footer.component';



@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    TranslateModule

  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LayoutHttpInterceptor, multi: true}
  ]
})
export class LayoutModule {
}
