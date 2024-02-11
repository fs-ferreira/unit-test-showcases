import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './showcases/dashboard/dashboard.component';
import { ExtratoComponent } from './showcases/extrato/extrato.component';
import { GuardGuard } from './guard.guard';
import { HomeComponent } from './showcases/home/home.component';
import { LoginComponent } from './showcases/login/login.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'extrato', component: ExtratoComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
