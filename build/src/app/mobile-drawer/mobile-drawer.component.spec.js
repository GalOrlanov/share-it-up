import { async, TestBed } from '@angular/core/testing';
import { MobileDrawerComponent } from './mobile-drawer.component';
describe('MobileDrawerComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MobileDrawerComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MobileDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mobile-drawer.component.spec.js.map