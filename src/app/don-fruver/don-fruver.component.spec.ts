import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonFruverComponent } from './don-fruver.component';

describe('DonFruverComponent', () => {
  let component: DonFruverComponent;
  let fixture: ComponentFixture<DonFruverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonFruverComponent]
    });
    fixture = TestBed.createComponent(DonFruverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
