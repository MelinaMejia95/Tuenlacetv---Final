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
import { CountriesService } from './services/countries.service';
import { CitiesService } from './services/cities.service';
import { ZonesService } from './services/zones.service';
import { NeighborhoodsService } from './services/neighborhoods.service';
import { BanksService } from './services/banks.service';
import { RatesService } from './services/rates.service';
import { ConceptsService } from './services/concepts.service';
import { AppGlobals } from './shared/app.global';
import { NavbarComponent } from './navbar/navbar.component';
import { PrincipalComponent } from './principal/principal.component';
import { NavbarPrincipalComponent } from './navbar-principal/navbar-principal.component';
import { CitiesComponent } from './cities/cities.component';
import { SuscriptorComponent } from './suscriptor/suscriptor.component';
import { FooterComponent } from './footer/footer.component';
import { CountriesComponent } from './countries/countries.component';
import { ZonesComponent } from './zones/zones.component';
import { NeighborhoodsComponent } from './neighborhoods/neighborhoods.component';
import { BanksComponent } from './banks/banks.component';
import { CompanyComponent } from './company/company.component';
import { RatesComponent } from './rates/rates.component';
import { ConceptsComponent } from './concepts/concepts.component';
import { PlansComponent } from './plans/plans.component';
import { UsersComponent } from './users/users.component';

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
    ZonesComponent,
    NeighborhoodsComponent,
    BanksComponent,
    CompanyComponent,
    RatesComponent,
    ConceptsComponent,
    PlansComponent,
    UsersComponent
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
  providers: [ LoginService, AppGlobals, CountriesService, CitiesService, ZonesService, NeighborhoodsService,
              BanksService, RatesService, ConceptsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
