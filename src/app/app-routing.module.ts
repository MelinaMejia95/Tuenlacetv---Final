import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component'
import { CitiesComponent } from './cities/cities.component'

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'cities', component: CitiesComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
