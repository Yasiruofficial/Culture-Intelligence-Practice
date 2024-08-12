import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

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
export class MemberAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService
  ) {}

  addMemberForm = this.formBuilder.group({
    first_name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    last_name: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    gender: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  onSubmit = () => {
    if (this.addMemberForm.valid) {
      this.memberService.addMember(this.addMemberForm.getRawValue());
    }
  };
}
