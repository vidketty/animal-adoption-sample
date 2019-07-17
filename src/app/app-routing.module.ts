import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAnimalComponent } from './animal/add-animal/add-animal.component';
import { AnimalsComponent } from './animal/animals/animals.component';
import { AdoptedAnimalsComponent } from './animal/adopted-animals/adopted-animals.component';
import { EditAnimalComponent } from './animal/edit-animal/edit-animal.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NonAuthGuard } from './guards/non-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [NonAuthGuard]
  },

  {
    path: 'animal', component: HomeComponent, children: [
      {
        path: '',
        component: AnimalsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },

      {
        path: 'edit/:id',
        component: EditAnimalComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },

      {
        path: 'shalter',
        component: AnimalsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },

      {
        path: 'adopted',
        component: AdoptedAnimalsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },

      {
        path: 'create',
        component: AddAnimalComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/animal',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
