import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowPasswordHideComponent } from './show-password-hide.component';

describe('ShowPasswordHideComponent', () => {
  let component: ShowPasswordHideComponent;
  let fixture: ComponentFixture<ShowPasswordHideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPasswordHideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPasswordHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
