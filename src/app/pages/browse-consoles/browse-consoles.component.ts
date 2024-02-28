import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry, EntrycardContainerComponent } from 'src/app/shared/components/entrycard-container/entrycard-container.component';

@Component({
  selector: 'app-browse-consoles',
  standalone: true,
  imports: [
    CommonModule,
    EntrycardContainerComponent,
  ],
  templateUrl: './browse-consoles.component.html',
  styleUrl: './browse-consoles.component.sass'
})
export class BrowseConsolesComponent implements OnInit {
  consoles$: Observable<Entry[]>

  ngOnInit(): void {

  }
}
