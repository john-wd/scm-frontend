import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-router-wrapper',
  templateUrl: './router-wrapper.component.html',
})
export class RouterWrapperComponent implements AfterViewInit {
  gameId: number;
  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    firstValueFrom(
      this.route.paramMap.pipe(map((params) => Number(params.get('game_id'))))
    ).then((gameId) => (this.gameId = gameId));
  }
}
