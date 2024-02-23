import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSonglistComponent } from './game-songlist.component';

describe('GameSonglistComponent', () => {
  let component: GameSonglistComponent;
  let fixture: ComponentFixture<GameSonglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSonglistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSonglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
