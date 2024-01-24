import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ObjectDropdownComponent } from './object-dropdown/object-dropdown.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './authorization.interceptor';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { QueryResComponent } from './query-res/query-res.component';
import { EditComponent } from './edit/edit.component';
import { Err404Component } from './err404/err404.component';
import { CheckOuthComponent } from './check-outh/check-outh.component';
import { OauthComponent } from './oauth/oauth.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ObjectDropdownComponent,
    QueryResComponent,
    EditComponent,
    Err404Component,
    CheckOuthComponent,
    OauthComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
