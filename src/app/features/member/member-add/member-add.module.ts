import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberAddRoutingModule } from './member-add-routing.module';
import { MemberAddComponent } from './member-add.component';


@NgModule({
  declarations: [
    MemberAddComponent
  ],
  imports: [
    CommonModule,
    MemberAddRoutingModule
  ]
})
export class MemberAddModule { }
