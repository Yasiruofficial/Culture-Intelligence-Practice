import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./member-list/member-list.module').then(
        (m) => m.MemberListModule
      )
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./member-add/member-add.module').then((m) => m.MemberAddModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberRoutingModule {}
