import { async, TestBed } from '@angular/core/testing';
import { ForgetpasswortComponent } from './forgetpasswort.component';
describe('ForgetpasswortComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForgetpasswortComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ForgetpasswortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=forgetpasswort.component.spec.js.map