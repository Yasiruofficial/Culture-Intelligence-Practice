import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Member } from '../../../core/models/member.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MemberService } from '../../../core/services/member/member.service';
import {
  RouterModule,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-member-add',
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
  templateUrl: './member-add.component.html',
  styleUrl: './member-add.component.scss',
})
export class MemberAddComponent implements OnDestroy, OnInit {
  addMemberForm: FormGroup;
  isAddComponent: boolean;
  memberId: string | null;
  memberSubscription?: Subscription;
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.memberId = this.route.snapshot.paramMap.get('id');
    this.isAddComponent = !this.memberId;
    this.isLoading = true;

    this.addMemberForm = this.formBuilder.group({
      first_name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      last_name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      gender: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
  ngOnInit(): void {
    if (this.memberId && !this.isAddComponent) {
      this.memberSubscription = this.memberService
        .fetchMembers()
        .pipe(
          map((members) =>
            members.find((member) => member.id === Number(this.memberId))
          )
        )
        .subscribe((data) => {
          if (data) {
            this.addMemberForm.setValue({
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              gender: data.gender,
            });
          } else {
            this.router.navigate(['/']);
          }
        });
    }
  }

  onSubmit = () => {
    if (this.addMemberForm.valid) {
      if (this.isAddComponent) {
        this.memberService.addMember(this.addMemberForm.getRawValue());
      } else {
        this.memberService.editMember(Number(this.memberId),this.addMemberForm.getRawValue());
      }
    }
  };

  ngOnDestroy(): void {
    if (this.memberSubscription) this.memberSubscription.unsubscribe();
  }
}
