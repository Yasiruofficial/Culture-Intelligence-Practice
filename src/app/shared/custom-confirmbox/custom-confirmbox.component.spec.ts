import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConfirmboxComponent } from './custom-confirmbox.component';

describe('CustomConfirmboxComponent', () => {
  let component: CustomConfirmboxComponent;
  let fixture: ComponentFixture<CustomConfirmboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomConfirmboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomConfirmboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
