import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleUpCardComponent } from './settle-up-card.component';

describe('SettleUpCardComponent', () => {
  let component: SettleUpCardComponent;
  let fixture: ComponentFixture<SettleUpCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettleUpCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleUpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
