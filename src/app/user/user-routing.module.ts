import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';

const routes: Routes = [
  {
    path:'',
    children :[
      {
        path: 'user-list',
        component: UserListComponent,
        data: {
          title: 'User list component'
        }
      },
      {
        path: 'user-upsert',
        component: UserUpsertComponent,
        data: {
          title: 'User upser component'
        }
      },
      {
        path: 'user-upsert/:id',
        component: UserUpsertComponent,
        data: {
          title: 'User upser component'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
