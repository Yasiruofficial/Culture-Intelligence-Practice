import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./member-list/member-list.component').then(
        (m) => m.MemberListComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./member-upsert/member-upsert.component').then(
        (m) => m.MemberUpsertComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./member-upsert/member-upsert.component').then(
        (m) => m.MemberUpsertComponent
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
