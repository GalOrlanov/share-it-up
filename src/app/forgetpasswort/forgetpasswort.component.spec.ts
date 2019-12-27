import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswortComponent } from './forgetpasswort.component';

describe('ForgetpasswortComponent', () => {
  let component: ForgetpasswortComponent;
  let fixture: ComponentFixture<ForgetpasswortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpasswortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetpasswortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
