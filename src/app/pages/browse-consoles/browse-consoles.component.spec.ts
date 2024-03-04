import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseConsolesComponent } from './browse-consoles.component';

describe('BrowseSeriesComponent', () => {
  let component: BrowseConsolesComponent;
  let fixture: ComponentFixture<BrowseConsolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseConsolesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BrowseConsolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
