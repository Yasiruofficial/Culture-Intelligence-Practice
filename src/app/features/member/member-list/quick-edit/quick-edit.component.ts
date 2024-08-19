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
  @Input() selectedMember: any = null;
  @Output() updateMember = new EventEmitter<Member>();
  @Output() closeQuickEdit = new EventEmitter<void>();

  position: TPosition = 'center';

  quickEditform: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.selectedMember) {
      this.quickEditform.setValue({
        first_name: this.selectedMember.first_name,
        email: this.selectedMember.email,
      });
    }
  }

  onSubmit() {
    this.updateMember.emit({
      ...this.selectedMember,
      first_name: this.quickEditform.controls['first_name'].value,
      email: this.quickEditform.controls['email'].value,
    });
  }

  onClose() {
    this.closeQuickEdit.emit();
  }
}
