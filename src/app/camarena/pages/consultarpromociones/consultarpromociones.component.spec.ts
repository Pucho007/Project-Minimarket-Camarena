import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarpromocionesComponent } from './consultarpromociones.component';

describe('ConsultarpromocionesComponent', () => {
  let component: ConsultarpromocionesComponent;
  let fixture: ComponentFixture<ConsultarpromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarpromocionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarpromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
