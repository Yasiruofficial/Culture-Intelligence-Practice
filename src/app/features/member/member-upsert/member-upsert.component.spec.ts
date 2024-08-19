import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUpsertComponent } from './member-upsert.component';

describe('MemberUpsertComponent', () => {
  let component: MemberUpsertComponent;
  let fixture: ComponentFixture<MemberUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
