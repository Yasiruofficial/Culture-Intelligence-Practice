import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { Subscription } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-member-upsert',
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
    ProgressSpinnerModule,
  ],
  templateUrl: './member-upsert.component.html',
  styleUrl: './member-upsert.component.scss'
})
export class MemberUpsertComponent implements OnDestroy{
  upsertMemberForm: FormGroup;
  memberId: number | null;
  memberSubscription?: Subscription;
  loading: boolean = false;

  
  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.memberId)) this.router.navigate(['/members']);

    this.upsertMemberForm = this.formBuilder.group({
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
    

    if (this.memberId) {
      this.loading = true;
      this.memberSubscription = this.memberService
        .getMemberById(this.memberId)
        .subscribe({
          next: (data) => {
            console.log('member add subscribe executed', data);
            if (data) {
              this.upsertMemberForm.setValue({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                gender: data.gender,
              });
              this.loading = false;
            }
          },
          error: (err) => {
            this.loading = false;
            alert(err);
            this.router.navigate(['/members']);
          },
        });
    }
  }

  onSubmit() {
    if (this.upsertMemberForm.valid) {
      if (!this.memberId) {
        this.memberService.addMember(this.upsertMemberForm.getRawValue());
      } else {
        this.memberService.updateMember(
          this.memberId,
          this.upsertMemberForm.getRawValue()
        );
      }
    }
  }

  ngOnDestroy(): void {
    if (this.memberSubscription) this.memberSubscription.unsubscribe();
  }
}
