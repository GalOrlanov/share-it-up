import { TestBed } from '@angular/core/testing';
import { SocketService } from './socket.service';
describe('SocketService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(SocketService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=socket.service.spec.js.map