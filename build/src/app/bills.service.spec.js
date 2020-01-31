import { TestBed } from '@angular/core/testing';
import { BillsService } from './bills.service';
describe('BillsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(BillsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=bills.service.spec.js.map