import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarstockComponent } from './consultarstock.component';

describe('ConsultarstockComponent', () => {
  let component: ConsultarstockComponent;
  let fixture: ComponentFixture<ConsultarstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
