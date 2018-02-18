import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component'
import { CitiesComponent } from './cities/cities.component'
import { SuscriptorComponent } from './suscriptor/suscriptor.component'
import { CountriesComponent } from './countries/countries.component';
import { ZonesComponent } from './zones/zones.component';
import { NeighborhoodsComponent } from './neighborhoods/neighborhoods.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'suscriptor', component: SuscriptorComponent },
  { path: 'countries', component: CountriesComponent},
  { path: 'zones', component: ZonesComponent },
  { path: 'neighborhoods', component: NeighborhoodsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
