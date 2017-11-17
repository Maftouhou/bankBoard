import { TestBed, inject } from '@angular/core/testing';

import { SoldService } from './sold.service';

describe('SoldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoldService]
    });
  });

  it('should be created', inject([SoldService], (service: SoldService) => {
    expect(service).toBeTruthy();
  }));
});
