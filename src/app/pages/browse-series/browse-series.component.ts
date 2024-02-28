import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry, EntrycardContainerComponent } from 'src/app/shared/components/entrycard-container/entrycard-container.component';

@Component({
  selector: 'app-browse-series',
  standalone: true,
  imports: [
    CommonModule,
    EntrycardContainerComponent,
  ],
  templateUrl: './browse-series.component.html',
  styleUrl: './browse-series.component.sass'
})
export class BrowseSeriesComponent implements OnInit {
  series$: Observable<Entry[]>

  ngOnInit(): void {

  }
}
