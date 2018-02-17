import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//import swal from 'sweetalert2';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PrincipalComponent } from './principal/principal.component';
import { NavbarPrincipalComponent } from './navbar-principal/navbar-principal.component';
import { CitiesComponent } from './cities/cities.component';
import { SuscriptorComponent } from './suscriptor/suscriptor.component';
import { FooterComponent } from './footer/footer.component';
import { CountriesComponent } from './countries/countries.component';
import { ZonesComponent } from './zones/zones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PrincipalComponent,
    NavbarPrincipalComponent,
    CitiesComponent,
    SuscriptorComponent,
    FooterComponent,
    CountriesComponent,
    ZonesComponent
  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  }),
  AppRoutingModule,
  HttpModule,
  FormsModule
  ],
  providers: [ LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
