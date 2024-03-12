import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopSelectorComponent } from './loop-selector.component';

describe('LoopSelectorComponent', () => {
  let component: LoopSelectorComponent;
  let fixture: ComponentFixture<LoopSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoopSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoopSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
