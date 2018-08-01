import { TestBed, inject } from '@angular/core/testing';

import { CsvReadService } from './csv-read.service';

describe('CsvReadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvReadService]
    });
  });

  it('should be created', inject([CsvReadService], (service: CsvReadService) => {
    expect(service).toBeTruthy();
  }));
});
