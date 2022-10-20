import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddComponent } from './edit-add/edit-add.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path: 'add',
    component: EditAddComponent
  },
  {
    path: 'edit/:id',
    component: EditAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransfersRoutingModule { }
