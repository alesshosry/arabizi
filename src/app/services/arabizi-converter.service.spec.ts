import { TestBed } from '@angular/core/testing';

import { ArabiziConverterService } from './arabizi-converter.service';

describe('ArabiziConverterService', () => {
  let service: ArabiziConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArabiziConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
