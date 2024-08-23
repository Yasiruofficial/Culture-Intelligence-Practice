import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TPosition } from '../../../../core/types/primeNG';
import { InputTextModule } from 'primeng/inputtext';
import { Member } from '../../../../core/models/member.model';

@Component({
  selector: 'app-quick-edit',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
  ],
  templateUrl: './quick-edit.component.html',
  styleUrl: './quick-edit.component.scss',
})
export class QuickEditComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() selectedMember: Member | null = null;
  @Output() selectedMemberChange = new EventEmitter<Member>();
  @Output() closeQuickEdit = new EventEmitter<boolean>();

  position: TPosition = 'center';

  quickEditform: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.selectedMember) {
      this.quickEditform.setValue({
        firstName: this.selectedMember.firstName,
        email: this.selectedMember.email,
      });
    }
  }

  onSubmit() {
  
    console.log({
      ...this.selectedMember,
      ...this.quickEditform.value,
    })

    console.log({
      ...this.selectedMember,
    })

    console.log({
      ...this.quickEditform.value,
    })

    this.selectedMemberChange.emit({
      ...this.selectedMember,
      ...this.quickEditform.value,
    });
    this.closeQuickEdit.emit(true);
  }

  onClose() {
    this.closeQuickEdit.emit(false);
  }
}
