import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrycardContainerComponent } from './entrycard-container.component';

describe('BrowseSeriesComponent', () => {
  let component: EntrycardContainerComponent;
  let fixture: ComponentFixture<EntrycardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrycardContainerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EntrycardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
