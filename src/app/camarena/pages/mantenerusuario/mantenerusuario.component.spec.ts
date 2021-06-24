import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerusuarioComponent } from './mantenerusuario.component';

describe('MantenerusuarioComponent', () => {
  let component: MantenerusuarioComponent;
  let fixture: ComponentFixture<MantenerusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenerusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenerusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
