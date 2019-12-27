import { TestBed } from '@angular/core/testing';
import { DataServiceService } from './data-service.service';
describe('DataServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(DataServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data-service.service.spec.js.map