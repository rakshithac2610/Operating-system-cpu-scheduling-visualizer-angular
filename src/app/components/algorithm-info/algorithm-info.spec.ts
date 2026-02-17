import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlgorithmInfo } from './algorithm-info'; // ✅ your standalone component
import { RouterTestingModule } from '@angular/router/testing'; // ✅ required for Router & ActivatedRoute

describe('AlgorithmInfo', () => {
  let component: AlgorithmInfo;
  let fixture: ComponentFixture<AlgorithmInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlgorithmInfo,           // ✅ standalone component
        RouterTestingModule      // ✅ mock router & route data
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlgorithmInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
