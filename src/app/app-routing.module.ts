import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TeachersComponent } from './teachers/teachers.component';
import { MatterComponent } from './matter/matter.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
   {path:'login',component:LoginComponent},
   {path:'teach',component:TeachersComponent},
   {path:'matter',component:MatterComponent},
  /*{path:'homeAdmin',component:HomeAdminComponent, */
    /* canActivate:[RutasLimitadasGuard] }, */
  /*Redireccionamientos al iniciar la app o un 404 */
  {path: '',pathMatch:'full',redirectTo: 'home'},
  {path: '**', pathMatch:'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
