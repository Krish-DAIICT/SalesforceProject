import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOuthComponent } from './check-outh.component';

describe('CheckOuthComponent', () => {
  let component: CheckOuthComponent;
  let fixture: ComponentFixture<CheckOuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckOuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckOuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
