import { TestBed } from '@angular/core/testing';

import { PracticanteService } from './practicante.service';

describe('PracticanteService', () => {
  let service: PracticanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
