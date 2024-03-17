import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareModalModal } from './share-modal.component';

describe('ShareModalComponent', () => {
  let component: ShareModalModal;
  let fixture: ComponentFixture<ShareModalModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareModalModal]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShareModalModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
