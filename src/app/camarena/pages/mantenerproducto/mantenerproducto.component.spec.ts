import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenerproductoComponent } from './mantenerproducto.component';

describe('MantenerproductoComponent', () => {
  let component: MantenerproductoComponent;
  let fixture: ComponentFixture<MantenerproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenerproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenerproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
