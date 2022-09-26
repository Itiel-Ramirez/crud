import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { UpdateUserComponent } from '../components/update-user/update-user.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'usuarios', component: HomeComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'update-user/:id', component: UpdateUserComponent },
      { path: '**', redirectTo: 'usuarios' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
