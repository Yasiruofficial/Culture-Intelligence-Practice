import { Component, OnDestroy } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { MemberService } from '../../../core/services/member/member.service';
import { Member } from '../../../core/models/member.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { CustomConfirmboxComponent } from '../../../shared/custom-confirmbox/custom-confirmbox.component';
import { QuickEditComponent } from './quick-edit/quick-edit.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CustomConfirmboxComponent,
    CommonModule,
    ButtonModule,
    TableModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    DividerModule,
    ToastModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    QuickEditComponent,
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnDestroy {
  members: Member[] = [];
  visible = false;
  selectedMember: any = null;
  memberSubscription: Subscription;

  constructor(private router: Router, private memberService: MemberService) {
    this.memberSubscription = this.memberService
      .getMembers()
      .subscribe((data) => {
        console.log('member list subscribe executed', data);
        if (data) this.members = data;
      });
  }

  deleteMember(id: number) {
    this.memberService.deleteMember(id);
  }

  navigateToEdit(id: number) {
    this.router.navigate([`members/update/${id}`]);
  }

  openQuickEdit(member: Member) {
    this.selectedMember = { ...member };
    this.visible = true;
  }

  closeQuickEdit(isSubmit : boolean) {
    if(isSubmit){
      if (this.selectedMember.id) {
        this.memberService.updateMember(this.selectedMember);
      }
    }
    this.selectedMember = null;
    this.visible = false;
  }

  logout() {
    localStorage.removeItem('LOGGED_USER');
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.memberSubscription.unsubscribe();
  }
}
