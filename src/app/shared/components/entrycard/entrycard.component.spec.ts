import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrycardComponent } from './entrycard.component';

describe('EntrycardComponent', () => {
  let component: EntrycardComponent;
  let fixture: ComponentFixture<EntrycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrycardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
