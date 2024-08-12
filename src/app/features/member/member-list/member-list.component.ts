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

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnDestroy {
  members: Member[];
  memberSubscription: Subscription;

  constructor(private router: Router, private memberService: MemberService) {
    console.log('Member list initiated');
    this.members = [];
    this.memberSubscription = this.memberService
      .getMembers()
      .subscribe((data) => (this.members = data));
  }

  deleteMember = (id: number) => {
    this.memberService.deleteMember(id);
  };

  navigateToEdit = (id : number) => {
    this.router.navigate([`/${id}`])
  }

  logout = () => {
    localStorage.removeItem('LOGGED_USER');
    this.router.navigate(['/auth/login']);
  };

  ngOnDestroy(): void {
    this.memberSubscription.unsubscribe();
  }
}
