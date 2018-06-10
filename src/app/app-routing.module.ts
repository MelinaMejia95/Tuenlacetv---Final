import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component'
import { CitiesComponent } from './cities/cities.component'
import { SubscriberComponent } from './subscriber/subscriber.component'
import { CountriesComponent } from './countries/countries.component';
import { ZonesComponent } from './zones/zones.component';
import { NeighborhoodsComponent } from './neighborhoods/neighborhoods.component';
import { BanksComponent } from './banks/banks.component';
import { CompanyComponent } from './company/company.component';
import { RatesComponent } from './rates/rates.component';
import { ConceptsComponent } from './concepts/concepts.component';
import { PlansComponent } from './plans/plans.component';
import { UsersComponent } from './users/users.component';
import { BillsComponent } from './bills/bills.component';
import { DepartmentsComponent } from './departments/departments.component';
import { GbillingsComponent } from './gbillings/gbillings.component';
import { AutomaticbillsComponent } from './automaticbills/automaticbills.component'
import { PaymentComponent } from './payment/payment.component';
import { AdvancepaymentsComponent } from './advancepayments/advancepayments.component';
import { TechniciansComponent } from './technicians/technicians.component';

/* class Permissions {
  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    return !token;
  }
}
 
@Injectable()
class CanActivateSection implements CanActivate {
  constructor(private permissions: Permissions, private router: Router) {}
 
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.permissions.canActivate() && route.url.length) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
} */

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', /* canActivate: [CanActivateSection] */ },
  { path: 'login', component: LoginComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'principal', component: PrincipalComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'cities', component: CitiesComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'subscriber', component: SubscriberComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'countries', component: CountriesComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'zones', component: ZonesComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'neighborhoods', component: NeighborhoodsComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'banks', component: BanksComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'company', component: CompanyComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'rates', component: RatesComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'concepts', component: ConceptsComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'plans', component: PlansComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'users', component: UsersComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'bills', component: BillsComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'departments', component: DepartmentsComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'gbillings', component: GbillingsComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'autobills', component: AutomaticbillsComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'payments', component: PaymentComponent,/*  canActivate: [CanActivateSection] */ },
  { path: 'advancepayments', component: AdvancepaymentsComponent, /* canActivate: [CanActivateSection] */ },
  { path: 'technicians', component: TechniciansComponent, /* canActivate: [CanActivateSection] */ }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [/* CanActivateSection, Permissions */]
})
export class AppRoutingModule { }
