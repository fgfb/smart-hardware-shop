import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendProductsComponent } from './amend-products.component';

describe('AmendProductsComponent', () => {
  let component: AmendProductsComponent;
  let fixture: ComponentFixture<AmendProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmendProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmendProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
