import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiSommmeNousComponent } from './qui-sommme-nous.component';

describe('QuiSommmeNousComponent', () => {
  let component: QuiSommmeNousComponent;
  let fixture: ComponentFixture<QuiSommmeNousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiSommmeNousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiSommmeNousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
