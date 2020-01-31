import { TestBed } from '@angular/core/testing';
import { ItemsService } from './items.service';
describe('ItemsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(ItemsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=items.service.spec.js.map