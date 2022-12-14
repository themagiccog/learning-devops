import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'details',component: HomeComponent}, // Return to home if Details has no parameters
  {path: 'details/:id',component: DetailsComponent},
  {path: 'new',component: NewComponent},
  {path: '', redirectTo:'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
