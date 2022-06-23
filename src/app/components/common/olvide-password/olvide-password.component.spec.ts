import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OlvidePasswordComponent } from './olvide-password.component';

describe('OlvidePasswordComponent', () => {
  let component: OlvidePasswordComponent;
  let fixture: ComponentFixture<OlvidePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidePasswordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OlvidePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
