import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberAddComponent } from './member-add.component';

const routes: Routes = [
  {
    path: '',
    component: MemberAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberAddRoutingModule {}
