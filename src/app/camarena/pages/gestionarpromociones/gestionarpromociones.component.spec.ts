import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarpromocionesComponent } from './gestionarpromociones.component';

describe('GestionarpromocionesComponent', () => {
  let component: GestionarpromocionesComponent;
  let fixture: ComponentFixture<GestionarpromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarpromocionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarpromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
