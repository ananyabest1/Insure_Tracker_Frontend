import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimReviewComponent } from './claim-review.component';

describe('ClaimReviewComponent', () => {
  let component: ClaimReviewComponent;
  let fixture: ComponentFixture<ClaimReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
