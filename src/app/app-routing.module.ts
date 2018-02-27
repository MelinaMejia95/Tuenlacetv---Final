import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component'
import { CitiesComponent } from './cities/cities.component'
import { SuscriptorComponent } from './suscriptor/suscriptor.component'
import { CountriesComponent } from './countries/countries.component';
import { ZonesComponent } from './zones/zones.component';
import { NeighborhoodsComponent } from './neighborhoods/neighborhoods.component';
import { BanksComponent } from './banks/banks.component';
import { CompanyComponent } from './company/company.component';
import { RatesComponent } from './rates/rates.component';
import { ConceptsComponent } from './concepts/concepts.component';
import { PlansComponent } from './plans/plans.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'suscriptor', component: SuscriptorComponent },
  { path: 'countries', component: CountriesComponent},
  { path: 'zones', component: ZonesComponent },
  { path: 'neighborhoods', component: NeighborhoodsComponent },
  { path: 'banks', component: BanksComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'rates', component: RatesComponent },
  { path: 'concepts', component: ConceptsComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'users', component: UsersComponent }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
