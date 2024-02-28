import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetailsModal } from './song-details-modal.component';

describe('SongDetailsModalComponent', () => {
  let component: SongDetailsModal;
  let fixture: ComponentFixture<SongDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDetailsModal]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SongDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
