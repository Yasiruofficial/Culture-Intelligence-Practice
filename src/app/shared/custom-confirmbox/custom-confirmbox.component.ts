import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TPosition } from '../../core/types/primeNG';



@Component({
  selector: 'app-custom-confirmbox',
  standalone: true,
  imports: [DialogModule, ButtonModule, CardModule],
  templateUrl: './custom-confirmbox.component.html',
  styleUrl: './custom-confirmbox.component.scss',
})
export class CustomConfirmboxComponent {
  visible: boolean = false;
  position: TPosition = 'center';

  @Input() header: string = '';
  @Output() resolveCallback = new EventEmitter();

  showDialog(position: TPosition) {
    this.position = position;
    this.visible = true;
  }
}
