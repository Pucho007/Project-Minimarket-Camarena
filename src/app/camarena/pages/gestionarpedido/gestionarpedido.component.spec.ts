import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarpedidoComponent } from './gestionarpedido.component';

describe('GestionarpedidoComponent', () => {
  let component: GestionarpedidoComponent;
  let fixture: ComponentFixture<GestionarpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarpedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
