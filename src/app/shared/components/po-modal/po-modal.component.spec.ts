import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoModalComponent } from './po-modal.component';

describe('PoModalComponent', () => {
  let component: PoModalComponent;
  let fixture: ComponentFixture<PoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
